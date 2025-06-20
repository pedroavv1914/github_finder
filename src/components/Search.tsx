type SearchProps ={
    loadUser: (userName: string) => Promise<void>;
}

import { useState, KeyboardEvent } from "react";

import { BsSearch } from "react-icons/bs"

import classes from './Search.module.css'

const Search = ({loadUser}: SearchProps) => {
    const [userName, setUserName] = useState("");

    const handleKeyDown = (e: KeyboardEvent) => {
        if(e.key === "Enter"){
            loadUser(userName);
        }
    }

    return (
        <div className={classes.search}>
            <h2>Busque por um usuário</h2>
            <p>Conheça seus projetos no GitHub</p>
            <div className={classes.search_container}>
                <div className="search_form">
                    <input 
                        type="text" 
                        placeholder="Digite o nome do usuário" 
                        onChange={(e) => setUserName(e.target.value)} 
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={() => loadUser(userName)}>
                        <BsSearch size={20}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Search