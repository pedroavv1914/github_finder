import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Repo from '../components/Repo';
import Loader from '../components/Loader';
import Error from '../components/Error';
import BackBtn from '../components/BackBtn';
import classes from './Repos.module.css';

interface RepoData {
  name: string;
  html_url: string;
  language?: string;
  languages_url: string;
  forks_count: number;
  stargazers_count: number;
  commits_url: string;
  pushed_at: string;
  fork: boolean;
  description: string;
}

const Repos = () => {
  const { username = '' } = useParams();
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const loadRepos = async () => {
      try {
        setLoading(true);
        setError('');
        
        const headers = new Headers();
        if (import.meta.env.VITE_GITHUB_TOKEN) {
          headers.append('Authorization', `token ${import.meta.env.VITE_GITHUB_TOKEN}`);
        }
        
        const res = await fetch(`https://api.github.com/users/${username}/repos`, { headers });
        
        if (!res.ok) {
          if (res.status === 403) {
            const resetTime = res.headers.get('x-ratelimit-reset');
            const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000) : null;
            setError(`Limite de requisições excedido. Tente novamente após ${resetDate?.toLocaleTimeString()}`);
          } else if (res.status === 404) {
            setError(`Usuário ${username} não encontrado`);
          } else {
            setError('Erro ao buscar repositórios');
          }
          return;
        }
        
        const reposData: RepoData[] = await res.json();
        
        const filteredRepos = reposData
          .filter((repo) => !repo.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
        
        setRepos(filteredRepos);
      } catch (err) {
        setError('Ocorreu um erro ao carregar os repositórios');
      } finally {
        setLoading(false);
      }
    };
    
    loadRepos();
  }, [username]);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  
  return (
    <div className={classes.repos}>
      <BackBtn />
      <h2>Explore os projetos do usuário: {username}</h2>
      
      {repos.length > 0 ? (
        <div className={classes.repos_container}>
          {repos.map((repo) => (
            <Repo
              key={repo.name}
              name={repo.name}
              html_url={repo.html_url}
              languages_url={repo.languages_url}
              language={repo.language}
              forks_count={repo.forks_count}
              stargazers_count={repo.stargazers_count}
              commits_url={repo.commits_url}
              pushed_at={repo.pushed_at}
              fork={repo.fork}
              description={repo.description}
            />
          ))}
        </div>
      ) : (
        <p>Não há repositórios públicos.</p>
      )}
    </div>
  );
};

export default Repos;