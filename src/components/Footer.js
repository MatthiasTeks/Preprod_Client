import { Link } from "react-router-dom";
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
                {/*<div className="footer-newsletter flex column center">*/}
                {/*    <div className="flex column justifyStart">*/}
                {/*        <h2>NEWSLETTER</h2>*/}
                {/*        <form id="newsletter-form" className="flex row" onSubmit={(e) => handleSubmit(e)}>*/}
                {/*            <input type="text" placeholder="Ton email" onChange={(e) => setMail(e.target.value)}/>*/}
                {/*            <Checkbox checked={checked} onChange={handleToggle} name="checkbox1" />*/}
                {/*            <button type="submit">Envoyer</button>*/}
                {/*        </form>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default Footer