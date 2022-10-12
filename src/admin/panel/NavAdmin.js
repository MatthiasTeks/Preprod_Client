import { Link } from 'react-router-dom';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import VideocamIcon from '@mui/icons-material/Videocam';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './NavAdmin.css';

const NavAdmin = () => {
    return (
        <div className="nav-admin flex column">
            <Link to="/panel-admin"><AutoAwesomeMosaicIcon /><h2>Dashboard</h2></Link>
            <Link to="/panel-admin/movie-admin"><VideocamIcon /><h2>Bande Demo</h2></Link>
            <Link to="/panel-admin/acteur-admin"><AccountCircleIcon /><h2>Acteurs</h2></Link>
        </div>
    )
}

export default NavAdmin