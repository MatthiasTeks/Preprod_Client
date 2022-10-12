import { Outlet } from 'react-router-dom';
import NavAdmin from "./NavAdmin";
import Analytics from "./Analytics";
import './PanelAdmin.css';

const PanelAdmin = () => {
    return (
        <div className="panel-admin flex row">
            <NavAdmin />
            <div className="admin-content">
                <Outlet />
            </div>
            <Analytics />
        </div>
    )
}

export default PanelAdmin