import { Link, NavLink } from 'react-router-dom';
import { NavList } from "../utils/data/NavList";
import { SocialList } from '../utils/data/SocialList';
import Logo from '../assets/logo.webp';
import LogoWhite from '../assets/logo_white.webp';
import './Navbar.css';

const Navbar = ({ burgerOpen, setBurgerOpen }) => {
    return (
        <div className="navbar flex row center justifyCenter">
            <div className="holder-logo flex row justifyCenter center">
                {/* TITLE */}
                <Link to="/">
                    <img src={burgerOpen ? LogoWhite : Logo} alt=""/>
                </Link>
            </div>
            {/* LINK BLOCK */}
            <div id="navbar-links" className="flex row">
                { NavList.map((i) => {
                    return (
                        <NavLink
                            key={`${i.pageName}${i}`}
                            to={i.link}
                            className={({ isActive }) =>
                                isActive ? "link-active" : undefined
                            }
                        >
                            <div className="link-name">
                                <p>{i.pageName}</p>
                            </div>
                        </NavLink>
                    )
                })}
            </div>
            {/* SOCIAL BLOCK */}
            <div className="navbar-social flex row center justifyEnd" id={burgerOpen ? "inactive" : ""}>
                { SocialList.map((i) => {
                    return (
                        <a key={`${i.name}${i}`} href={i.href} target="_blank" rel="noreferrer" className={i.name}>
                            {i.icon}
                        </a>
                    )
                })}
            </div>
            {/* BURGER DISPLAY ON MOBILE */}
            <button className={`navbar-burger ${burgerOpen ? 'opened' : ""}`} onClick={() => setBurgerOpen(!burgerOpen)} aria-label="Main Menu" aria-expanded={burgerOpen}>
                <svg width="50" height="50" viewBox="0 0 100 100">
                    <path className="burger-line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"/>
                    <path className="burger-line line2" d="M 20,50 H 80"/>
                    <path className="burger-line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"/>
                </svg>
            </button>
        </div>
    )
}

export default Navbar