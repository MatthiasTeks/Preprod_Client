import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RequireAuth = (props) => {
    const [access, setAccess] = useState(false);

    const navigate = useNavigate();

    const protectedRoute = () => {
        const token = localStorage.getItem("token");
        axios({
            method: "POST",
            url: `https://mysql-deploy-preprod.herokuapp.com/auth/protected`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((result) => {
                setAccess(result.data.access);
            })
            .catch((err) => {
                setAccess(false);
                navigate("/admin");
            });
    };

    useEffect(() => {
        protectedRoute();
    }, []);

    return (
        <>
            { access ?
                props.children
                :
                null
            }
        </>
    )
}

export default RequireAuth;