import {useState} from "react";
import { Checkbox } from "@mui/material";
import TextField from '@mui/material/TextField';
import axios from "axios";
import './Newsletter.css';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Button from "./Button";

const Newsletter = (props) => {

    const [mail, setMail] = useState("");
    const [acceptCaptcha, setAcceptCaptcha] = useState(false);
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(mail.length > 0){
            axios
                .post(`https://mysql-deploy-preprod.herokuapp.com/newsletter/create`, {
                    mail: mail,
                    auth: acceptCaptcha === true ? 1 : 0,
                }).then(r => console.log(r))
        }
    }

    const handleToggle = () => {
        setAcceptCaptcha(!acceptCaptcha)
        setChecked(!checked)
    }


    const isValidEmail = (mail) => {
        return /\S+@\S+\.\S+/.test(mail);
    }

    const handleChange = event => {
        if (!isValidEmail(event.target.value)) {
            console.log('slt error')
            setError('Email is invalid');
        } else {
            setError(null);
        }

        setMail(event.target.value);
    }

    return (
            <div className="newsletter flex column justifyCenter center">
                <div className="newsletter-content flex column justifyCenter center">
                    <h2>Abonne toi à notre newsletter !</h2>
                    <form id="newsletter-form" className="flex column justifyCenter center" onSubmit={(e) => handleSubmit(e)}>
                        {error &&
                            <p className="error-email">{error}</p>
                        }
                        <TextField id="standard-basic" label="Email" variant="standard" type="email" required={true} onChange={(e) => handleChange(e)}/>
                        <div className="flex row justifyCenter center">
                            <p style={{ fontSize: "14px" }}>J'accepte etre recontacté par les Films de la Bande : </p>
                            <Checkbox checked={checked} onChange={handleToggle} name="checkbox1" />
                        </div>
                        <Button isBlack={true} text="Envoyer" type="submit"/>
                    </form>
                </div>
                <HighlightOffIcon onClick={() => props.setNewsletterOpen(false)}/>
            </div>
    )
}

export default Newsletter