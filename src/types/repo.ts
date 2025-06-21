export interface RepoProps {
    name: string
    language: string
    html_url: string
    forks_count: number
    stargazers_count: number
    description?: string
    fork: boolean
    languages_url: string
}