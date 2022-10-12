import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import './HomeVideo.css';

const HomeVideo = () => {
    const [movie, setMovie] = useState();

    useEffect(() => {
        fetch("https://mysql-deploy-preprod.herokuapp.com/home/media")
            .then((resp) => resp.json())
            .then((data) => setMovie(data));
    }, [])

    return (
        <div className="home-video">
            { movie &&
                <video autoPlay muted loop id="home-movie" poster={`https://mysql-deploy-preprod.herokuapp.com/assets/home/${movie[0].poster}`}>
                    <source src={`https://mysql-deploy-preprod.herokuapp.com/assets/home/${movie[0].lien}`} type="video/webm"/>
                </video>
            }
            <div className="home-video-content flex column center justifyCenter">
                <h1>CREATION DE BANDES DEMOS SUR MESURE</h1>
                <Link to="bande-demo">
                    <Button isWhite={true} text="En savoir plus" />
                </Link>
            </div>
            <div className="home-video-scrolling flex column center justifyCenter">
                <div className="scroller flex column center">
                    <hr className="shine-effect"/>
                    <p className="shine-effect">scroll</p>
                </div>
            </div>
        </div>
    )
}

export default HomeVideo