export interface RepoProps {
  name: string;
  html_url: string;
  languages_url: string;
  language?: string;
  forks_count: number;
  stargazers_count: number;
  commits_url: string;
  pushed_at: string;
  fork: boolean;
  description?: string;
  languages?: {[key: string]: number};
  commit_count?: number;
}