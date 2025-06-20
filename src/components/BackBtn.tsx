import { useNavigate } from "react-router-dom"
import classes from './BackBtn.module.css'

const backBtn = () => {
    const navigate = useNavigate()

    return (
        <button className={classes.backBtn} onClick={() => navigate(-1)}>Voltar</button>
    )
}

export default backBtn