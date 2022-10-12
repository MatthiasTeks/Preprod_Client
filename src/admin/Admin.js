import { useContext } from 'react'
import TextField from '@mui/material/TextField';
import { AuthContext } from '../context/AuthContext';
import Button from "../components/Button";
import Footer from "../components/Footer";
import './Admin.css';

const Connexion = () => {

    const { email, setEmail, password, setPassword, handleSubmit } = useContext(AuthContext)

    return (
        <>
            <div className='admin-log'>
                <h1>LES FILMS DE LA BANDE</h1>
                <h2>PANEL ADMINISTRATEUR</h2>
                <form className='admin-access flex column' onSubmit={(e) => handleSubmit(e)}>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Mot de passe"
                        variant="outlined"
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button isBlack={true} text="Connexion" type="submit"/>
                </form>
                <Footer />
            </div>
        </>
    )
}
export default Connexion