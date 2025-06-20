export interface UserProps {
  login: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos?: number;
  location?: string;
  languages?: {
    [key: string]: number;
  };
}