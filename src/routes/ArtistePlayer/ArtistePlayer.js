import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import './ArtistePlayer.css';

const ArtistePlayer = () => {

    /* STORE SPECIFIC ACTER DEPEND OF PARAMS */
    const [actor, setActor] = useState("");

    /* PARAMS ID ACTOR */
    let { artisteName } =  useParams();

    useEffect(() => {
        fetch(`https://mysql-deploy-preprod.herokuapp.com/actor`)
            .then((resp) => resp.json())
            .then((data) => {
                setActor(data.filter(data => data.label === artisteName));
            })
    }, [])


    return (
        <div className="artiste-player-page flex column justifyCenter center">
            { actor.length > 0 ?
                <div className="movie-played-holder-actor">
                    <div className="movie-played">
                        <div className="movie-played-header-actor flex row center justifyBetween">
                            <div className="movie-played-header-content flex row center justifyStart">
                                <h2>{actor[0].name}</h2>
                                <p> - vidéo une {actor[0].type_movie}</p>
                            </div>
                        </div>
                        <ReactPlayer
                            controls={true}
                            width='100%'
                            height='100%'
                            url={`https://mysql-deploy-preprod.herokuapp.com/assets/movie/${actor[0].media_movie}`}
                            className="movie-player"
                        />
                    </div>
                </div>
                : ""
            }
        </div>
    )
}

export default ArtistePlayer