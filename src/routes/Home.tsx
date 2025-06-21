import { useState } from "react";

import Search from "../components/Search";
import User from "../components/User";
import Error from "../components/Error";
import { UserProps } from "../types/user";
import classes from './Home.module.css';

const Home = () => {

    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const loadUser = async(userName: string) => {
        setIsLoading(true)
        setError(null)
        setUser(null)

        try {
            if (!userName.trim()) {
                setError('Por favor, digite um nome de usuário')
                return
            }

            const headers = new Headers();
            if (import.meta.env.VITE_GITHUB_TOKEN) {
                headers.append('Authorization', `token ${import.meta.env.VITE_GITHUB_TOKEN}`);
            }

            const userUrl = `https://api.github.com/users/${encodeURIComponent(userName)}`
            const userRes = await fetch(userUrl, { headers })

            if (!userRes.ok) {
                if (userRes.status === 403) {
                    const resetTime = userRes.headers.get('x-ratelimit-reset');
                    const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000) : null;
                    setError(`Limite de requisições excedido. Tente novamente ${resetDate ? 'após ' + resetDate.toLocaleTimeString() : 'mais tarde'}`)
                } else if (userRes.status === 404) {
                    setError(`Usuário "${userName}" não encontrado no GitHub`)
                } else {
                    setError(`Erro na API: ${userRes.status}`)
                }
                return
            }

            const userData = await userRes.json()

            if (!userData.login) {
                setError(`Usuário "${userName}" não encontrado`)
                return
            }

            // Busca repositórios para extrair linguagens
            const reposRes = await fetch(`https://api.github.com/users/${userName}/repos`)
            const reposData = await reposRes.json()

            // Processa linguagens dos repositórios
            const languages: {[key: string]: number} = {}
            reposData.forEach((repo: {language?: string}) => {
                if(repo.language) {
                    languages[repo.language] = (languages[repo.language] || 0) + 1
                }
            })

            const {avatar_url, login, location, followers, following, public_repos} = userData

            setUser({
                avatar_url,
                login,
                location,
                followers,
                following,
                public_repos,
                languages: Object.keys(languages).length > 0 ? languages : undefined
            })
        } catch (error) {
            setError('Ocorreu um erro ao buscar o usuário. Verifique sua conexão.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <Search loadUser={loadUser} loading={isLoading} />
            {user && (
              <div className={classes.profileContainer}>
                <User {...user} />
              </div>
            )}
            {error && <Error message={error} />}
        </div>
    )
}

export default Home