import { Link } from "react-router-dom";
import LogoMin from '../assets/logo_min.webp';
import './Footer.css';

const Footer = (props) => {

    return (
        <div className="footer-holder flex column justifyCenter">
            <div className="footer flex row justifyBetween">
                <div className="footer-nav flex column justifyStart">
                    <Link to="mentions-legales" onClick={() => window.scrollTo(0, 0)}>MENTIONS LEGALES</Link>
                    <p onClick={() => props.setNewsletterOpen(!props.newsletterOpen)}>NEWSLETTER</p>
                    <p>CONTACT</p>
                </div>
                {/*<img src={LogoMin} alt="Logo miniature of Les Films de la Bande"/>*/}
            </div>
        </div>
    )
}

export default Footer