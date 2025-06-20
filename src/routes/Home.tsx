import { UserProps } from "../types/user";

import Search from "../components/Search"
import User from "../components/User";
import Error from "../components/Error";
import Loader from "../components/Loader";

import { useState } from "react"

const Home = () => {

    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const loadUser = async(userName: string) => {
        setIsLoading(true)
        setError(false)
        setUser(null)

        try {
            // Busca dados básicos do usuário
            const userRes = await fetch(`https://api.github.com/users/${userName}`)
            
            if(userRes.status === 404) {
                setError(true)
                setIsLoading(false)
                return
            }

            const userData = await userRes.json()
            
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
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <Search loadUser={loadUser}/>
            {isLoading && <Loader />}
            {user && <User {...user}/>}
            {error && <Error />}
        </div>
    )
}

export default Home