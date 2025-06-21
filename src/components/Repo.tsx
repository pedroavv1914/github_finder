import { useState, useEffect } from 'react';
import { FaCodeBranch, FaStar, FaExternalLinkAlt } from 'react-icons/fa';
import { RepoProps } from '../types/repo';
import classes from './Repo.module.css';
import { GITHUB_TOKEN } from '../config.ts';

export default function Repo({
  name,
  html_url,
  languages_url,
  language,
  forks_count,
  stargazers_count,
  commits_url,
  pushed_at,
  description,
  fork
}: RepoProps) {
  const [languages, setLanguages] = useState<{[key: string]: number}>({});
  const [commitCount, setCommitCount] = useState<number | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar linguagens
        const langRes = await fetch(languages_url);
        const langData = await langRes.json();
        setLanguages(langData);
        
        // Buscar commits
        const headers = new Headers();
        if (GITHUB_TOKEN) headers.append('Authorization', `token ${GITHUB_TOKEN}`);
        
        const commitsUrl = commits_url.replace('{/sha}', '') + '?per_page=1';
        const commitsRes = await fetch(commitsUrl, { headers });
        
        const linkHeader = commitsRes.headers.get('Link');
        if (linkHeader) {
          const matches = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (matches) setCommitCount(parseInt(matches[1]));
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    
    fetchData();
  }, [languages_url, commits_url]);
  
  const lastUpdate = new Date(pushed_at).toLocaleDateString('pt-BR');
  
  return (
    <div className={classes.timeline_item}>
      <div className={classes.timeline_dot}></div>
      
      <div className={classes.timeline_content}>
        <div className={classes.repo_header}>
          <h3>
            <a href={html_url} target="_blank" rel="noreferrer">
              {name} {fork && <span className={classes.fork_badge}>(Fork)</span>}
            </a>
          </h3>
          <span className={classes.repo_date}>{lastUpdate}</span>
        </div>
        
        {description && <p className={classes.description}>{description}</p>}
        
        <div className={classes.repo_stats}>
          <span><FaStar /> {stargazers_count}</span>
          <span><FaCodeBranch /> {forks_count}</span>
          <span>Commits: {commitCount !== null ? commitCount : '...'}</span>
        </div>
        
        {Object.keys(languages).length > 0 && (
          <div className={classes.languages}>
            <h4>Linguagens:</h4>
            <div className={classes.language_bars}>
              {Object.entries(languages).map(([lang, bytes]) => (
                <div key={lang} className={classes.language_bar}>
                  <span className={classes.language_name}>{lang}</span>
                  <div className={classes.bar_container}>
                    <div 
                      className={classes.bar_fill}
                      style={{
                        width: `${(bytes / Object.values(languages).reduce((a, b) => a + b, 0)) * 100}%`,
                        backgroundColor: getLanguageColor(lang)
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Função auxiliar para cores de linguagem (simplificada)
function getLanguageColor(lang: string): string {
  const colors: Record<string, string> = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'PHP': '#4F5D95'
  };
  return colors[lang] || '#586069';
}