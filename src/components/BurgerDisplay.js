import { NavLink } from 'react-router-dom';
import { NavList } from "../utils/data/NavList";
import { SocialList } from '../utils/data/SocialList';
import './BurgerDisplay.css';

const BurgerDisplay = ({ burgerOpen, setBurgerOpen }) => {
    return (
        <div className={`burger-display flex column ${burgerOpen ? "burger-active" : ""} `}>
            { burgerOpen &&
                <div className="burger-content flex column">
                    <div className="burger-links flex column">
                        { NavList.map((i) => {
                            return (
                                <NavLink
                                    key={`${i.pageName}${i}`}
                                    to={i.link}
                                    className={({ isActive }) =>
                                        isActive ? "nav-effect-mobile" : undefined
                                    }
                                    onClick={() => setBurgerOpen(!burgerOpen)}
                                >
                                    {i.pageName}
                                </NavLink>
                            )
                        })}
                    </div>
                    <div className="burger-social flex">
                        { SocialList.map((i) => {
                            return (
                                <a key={`${i.name}${i}`} href={i.href} target="_blank" rel="noreferrer">
                                    {i.iconMobile}
                                </a>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )
}

export default BurgerDisplay