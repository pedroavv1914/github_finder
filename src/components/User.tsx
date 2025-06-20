import { UserProps } from "../types/user"
import { useMemo } from "react"
import { MdLocationPin } from "react-icons/md"
import { Link } from "react-router-dom"
import { 
    SiJavascript, SiTypescript, SiPython, SiCplusplus,
    SiHtml5, SiCss3, SiPhp, SiRuby, SiCoder 
} from "react-icons/si"
import classes from './User.module.css'

declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    interface ElementClass extends React.Component<any> {
      render(): React.ReactNode;
    }
    interface ElementAttributesProperty { props: {}; }
    interface ElementChildrenAttribute { children: {}; }
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const User = ({ login, avatar_url, followers, following, location, languages, public_repos }: UserProps) => {
    // Calcular porcentagens se existirem linguagens
    const normalizedLangs = useMemo(() => {
        if(!languages) return null;
        
        const langEntries = Object.entries(languages as Record<string, number>)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);
            
        const total = langEntries.reduce((sum, [, count]) => sum + count, 0);
            
        return langEntries.map(([lang, count]) => ({
            name: lang,
            percentage: Math.round((count / total) * 100)
        }));
    }, [languages]);

    // Ícones para linguagens populares
    const getLanguageIcon = (lang: string) => {
        const icons = {
            'JavaScript': <SiJavascript className={classes.lang_icon} />,
            'TypeScript': <SiTypescript className={classes.lang_icon} />,
            'Python': <SiPython className={classes.lang_icon} />,
            'C++': <SiCplusplus className={classes.lang_icon} />,
            'HTML': <SiHtml5 className={classes.lang_icon} />,
            'CSS': <SiCss3 className={classes.lang_icon} />,
            'PHP': <SiPhp className={classes.lang_icon} />,
            'Ruby': <SiRuby className={classes.lang_icon} />,
        } as Record<string, JSX.Element>;
        
        return icons[lang] || <SiCoder className={classes.lang_icon} />;
    };

    return (
        <div className={classes.user}>
            <div className={classes.user_img_container}>
                <img src={avatar_url} alt={login} />
            </div>
            
            <div className={classes.user_info}>
                <h2>{login}</h2>
                
                {/* Linguagens abaixo do nome */}
                {normalizedLangs && (
                    <div className={classes.languages_container}>
                        {normalizedLangs.map((lang) => (
                            <div key={lang.name} className={classes.language_item}>
                                {getLanguageIcon(lang.name)}
                                <span>{lang.name}</span>
                                <div className={classes.language_bar}>
                                    <div 
                                        className={classes.language_fill} 
                                        style={{ width: `${lang.percentage}%` }}
                                    />
                                </div>
                                <span>{lang.percentage}%</span>
                                
                                <div className={classes.language_tooltip}>
                                    Usada em {Math.round((lang.percentage / 100) * (public_repos || 0))} repositórios
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {location && (
                    <p className={classes.location}>
                        <MdLocationPin />
                        <span>{location}</span>
                    </p>
                )}

                <div className={classes.stats}>
                    <div>
                        <p>Seguidores:</p>
                        <p className={classes.number}>{followers}</p>
                    </div>
                    <div>
                        <p>Seguindo:</p>
                        <p className={classes.number}>{following}</p>
                    </div>
                    <Link to={`/repos/${login}`} className={classes.repo_link}>
                        Conhecer seus projetos
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default User