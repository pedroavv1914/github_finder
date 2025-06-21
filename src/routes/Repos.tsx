import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Repo from '../components/Repo';
import Loader from '../components/Loader';
import BackBtn from '../components/BackBtn';
import { RepoProps } from '../types/repo';
import classes from './Repos.module.css';

const Repos = () => {
  const { username } = useParams();
  const [repos, setRepos] = useState<RepoProps[] | [] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadRepos = async (username: string) => {
      setIsLoading(true);
      const res = await fetch(`https://api.github.com/users/${username}/repos`);
      const data = await res.json();
      setIsLoading(false);
      
      const orderedRepos = data
        .filter((repo: RepoProps) => repo.fork === false || repo.fork === null) // Corrigir filtro de forks
        .sort((a: RepoProps, b: RepoProps) => b.stargazers_count - a.stargazers_count);
      
      setRepos(orderedRepos);
    };

    if (username) loadRepos(username);
  }, [username]);

  if (!repos && isLoading) return <Loader />;

  return (
    <div className={classes.repos}>
      <BackBtn />
      <h2>Explore os projetos do usuário: {username}</h2>
      
      {repos && repos.length === 0 && (
        <p>Não há repositórios públicos.</p>
      )}
      
      {repos && repos.length > 0 && (
        <div className={classes.repos_container}>
          {repos.map((repo: RepoProps) => (
            <Repo key={repo.name} {...repo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Repos;