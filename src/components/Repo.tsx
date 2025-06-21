import { useState, useEffect } from 'react';
import { FaCodeBranch, FaStar, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import { RepoProps } from '../types/repo';
import classes from './Repo.module.css';

export default function Repo({
  name,
  html_url,
  languages_url,
  forks_count,
  stargazers_count,
  commits_url,
  description
}: RepoProps) {
  const [languages, setLanguages] = useState<{[key: string]: number}>({});
  const [commitCount, setCommitCount] = useState<number | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = new Headers();
        if (import.meta.env.VITE_GITHUB_TOKEN) {
          headers.append('Authorization', `token ${import.meta.env.VITE_GITHUB_TOKEN}`);
        }

        // Buscar linguagens
        const langRes = await fetch(languages_url, { headers });
        const langData = await langRes.json();
        setLanguages(langData);
        
        // Buscar contagem de commits
        const commitsUrl = commits_url.replace('{/sha}', '') + '?per_page=1&page=1';
        const commitsRes = await fetch(commitsUrl, { headers });
        
        // Extrair total de commits do cabeçalho Link
        const linkHeader = commitsRes.headers.get('Link');
        if (linkHeader) {
          const matches = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (matches && matches[1]) {
            setCommitCount(parseInt(matches[1]));
          }
        }
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      }
    };
    
    fetchData();
  }, [languages_url, commits_url]);

  // Calcular total de bytes para porcentagens
  const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

  return (
    <div className={classes.repo}>
      <div className={classes.repo_header}>
        <h3>
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            {name} <FaExternalLinkAlt />
          </a>
        </h3>
        {description && <p className={classes.description}>{description}</p>}
      </div>
      
      <div className={classes.stats}>
        <span>
          <FaStar /> {stargazers_count}
        </span>
        <span>
          <FaCodeBranch /> {forks_count}
        </span>
        {commitCount !== null && (
          <span>
            <FaCode /> {commitCount} commits
          </span>
        )}
      </div>
      
      {Object.keys(languages).length > 0 && (
        <div className={classes.languages}>
          <h4>Tecnologias:</h4>
          <div className={classes.language_bars}>
            {Object.entries(languages)
              .sort((a, b) => b[1] - a[1])
              .map(([lang, bytes]) => (
                <div key={lang} className={classes.language_bar}>
                  <span 
                    className={classes.language_indicator}
                    style={{ backgroundColor: getLanguageColor(lang) }}
                  />
                  <span>{lang}</span>
                  <span>{Math.round((bytes / totalBytes) * 100)}%</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Função auxiliar para cores de linguagem (atualizada)
function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    'JavaScript': '#f7df1e', // Amarelo mais vibrante
    'TypeScript': '#007acc', // Azul mais suave
    'HTML': '#e44d26', // Laranja HTML5
    'CSS': '#2965f1', // Azul CSS3
    'Python': '#3776ab', // Azul Python
    'Java': '#5382a1', // Azul Java
    'Ruby': '#cc342d', // Vermelho Ruby
    'PHP': '#777bb4', // Roxo PHP
    'C++': '#00599c', // Azul C++
    'C': '#555555', // Cinza C
    'Shell': '#89e051', // Verde Shell
    'Swift': '#fa7343', // Laranja Swift
    'Kotlin': '#0095d5', // Azul Kotlin
    'Go': '#00add8', // Azul Go
    'Rust': '#dea584', // Marrom claro Rust
    'Dart': '#00b4ab' // Verde-água Dart
  };
  
  return colors[language] || '#6e5494'; // Roxo padrão mais bonito
}