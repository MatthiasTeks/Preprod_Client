import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SpeedDial, SpeedDialAction } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InstagramIcon from '@mui/icons-material/Instagram';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import BurgerDisplay from "./components/BurgerDisplay";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Newsletter from "./components/Newsletter";
import './utils.css';

const App = () => {

    const [burgerOpen, setBurgerOpen] = useState(false);
    const [newsletterOpen, setNewsletterOpen] = useState(false);

    /* THEME INIT MUI REACT */
    const theme = createTheme({
        palette: {
            primary: {
                main: '#1B1919'
            },
            secondary: {
                main: '#F8F8F8'
            }
        }
    });

    /* ACTIONS SPEED DIAL */
    const actions = [
        { icon: <a className="flex row justifyCenter center" href="https://wa.me/33765555830" rel="noreferrer" target="_blank"><WhatsAppIcon /></a>, name: 'Whatsapp'},
        { icon: <a className="flex row justifyCenter center" href="https://mail.google.com/mail/u/0/?fs=1&to=lesfilmsdelabande@gmail.com&tf=cm" rel="noreferrer" target="_blank"><MailOutlineIcon /></a>, name: 'Mail' },
        { icon: <a className="flex row justifyCenter center" href="https://www.instagram.com/lesfilmsdelabande/" rel="noreferrer" target="_blank"><InstagramIcon /></a>, name: 'Instagram'},
    ];

    return (
        <ThemeProvider theme={theme}>
            <div className="mv-app">
                <BurgerDisplay burgerOpen={burgerOpen} setBurgerOpen={setBurgerOpen}/>
                <Navbar burgerOpen={burgerOpen} setBurgerOpen={setBurgerOpen} />
                <Outlet context={[burgerOpen, setBurgerOpen]} />
                <Footer newsletterOpen={newsletterOpen} setNewsletterOpen={setNewsletterOpen} />
                { burgerOpen === false ?
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'absolute', bottom: 16, right: 16 }}
                        icon={<CallIcon openicon={<CallEndIcon />} />}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                            />
                        ))}
                    </SpeedDial>
                    : ""
                }
                { newsletterOpen === true ?
                    <Newsletter newsletterOpen={newsletterOpen} setNewsletterOpen={setNewsletterOpen} />
                    : ""
                }
                { newsletterOpen === true ?
                    <div className="movie-filter" />
                    : ""
                }
            </div>
        </ThemeProvider>
  );
}

export default App;
