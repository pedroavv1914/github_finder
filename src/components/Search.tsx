type SearchProps ={
    loadUser: (userName: string) => Promise<void>;
    loading: boolean;
}

import { useState, KeyboardEvent } from "react";

import classes from './Search.module.css'

const Search = ({loadUser, loading}: SearchProps) => {
    const [userName, setUserName] = useState("");

    const handleKeyDown = (e: KeyboardEvent) => {
        if(e.key === "Enter") {
            loadUser(userName);
        }
    };

    return (
        <div className={classes.search}>
            <h2>Busque por um usuário:</h2>
            <p>Conheça seus melhores repositórios</p>
            <div className={classes.search_container}>
                <input 
                    type="text" 
                    placeholder="Digite o nome do usuário" 
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                />
                <button 
                    onClick={() => loadUser(userName)}
                    disabled={loading}
                >
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </div>
        </div>
    );
};

export default Search;