import { useState, useEffect } from 'react';
import { SiGithub } from 'react-icons/si';
import classes from './Repo.module.css';
import { RepoProps } from '../types/repo';

const Repo = ({
  name,
  html_url,
  forks_count,
  stargazers_count,
  description,
  languages_url
}: RepoProps) => {
  const [languages, setLanguages] = useState<{[key: string]: number}>({});

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await fetch(languages_url);
        const data = await res.json();
        setLanguages(data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, [languages_url]);

  return (
    <div className={classes.repo}>
      <h3>{name}</h3>
      {description && <p className={classes.description}>{description}</p>}
      
      <div className={classes.languages}>
        {Object.keys(languages).map((lang) => (
          <span key={lang} className={classes.language_badge}>
            {lang}
          </span>
        ))}
      </div>
      
      <div className={classes.repo_stats}>
        <span>⭐ {stargazers_count}</span>
        <span>⑂ {forks_count}</span>
      </div>
      
      <a href={html_url} target="_blank" rel="noreferrer" className={classes.repo_link}>
        <SiGithub />
        <span>View on GitHub</span>
      </a>
    </div>
  )
}

export default Repo;