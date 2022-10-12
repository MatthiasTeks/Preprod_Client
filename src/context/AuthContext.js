import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext(undefined);

const AuthContextProvider = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleConnexion = () => {
        const token = localStorage.getItem("token");
        axios({
            method: "POST",
            url: `https://mysql-deploy-preprod.herokuapp.com/auth/protected`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((result) => {
                navigate("/panel-admin")
            })
            .catch((err) => {
                navigate("/admin");
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`https://mysql-deploy-preprod.herokuapp.com/auth/login`, {
                email: email,
                password: password,
            })
            .then((res) => {
                localStorage.setItem("token", res.headers["x-access-token"]);
            })
            .then(
                handleConnexion
            )
    };

    return (
        <AuthContext.Provider
            value={{
                email,
                setEmail,
                password,
                setPassword,
                handleSubmit,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;