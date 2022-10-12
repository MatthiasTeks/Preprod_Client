import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import './Artiste.css';
import { Link } from "react-router-dom";

const Artiste = () => {

    /* STORE SPECIFIC ACTER DEPEND OF PARAMS */
    const [actor, setActor] = useState("");

    /* PARAMS ID ACTOR */
    let { artisteName } =  useParams();

    useEffect(() => {
        fetch(`https://mysql-deploy-preprod.herokuapp.com/actor/${artisteName}`)
            .then((resp) => resp.json())
            .then((data) => {
                setActor(data)
            })
    }, [])

    return (
        <div className="artiste">
            { actor &&
                <div className="artiste-banner">
                    <img src={`${(`https://mysql-deploy-preprod.herokuapp.com/assets/actor/${actor.media_horizontal}`)}`} alt=""/>
                    <h1>{actor.name}</h1>
                </div>
            }
            {
                actor &&
                <div className="artiste-resume flex column">
                    {/*<p className="artiste-avis is4">“ {actor.avis} ”</p>*/}
                    <h2>La biographie de {actor.name} </h2>
                    <p className="artiste-biography">{actor.biography.replace('\n', '\n')}</p>
                    <Link to={`/${actor.label}`}>
                        <Button isBlack={true} text="Voir sa bande demo"/>
                    </Link>
                    <div className="artiste-holder-img flex justifyBetween">
                        <img src={`${(`https://mysql-deploy-preprod.herokuapp.com/assets/actor/${actor.media_rounded}`)}`} alt="" loading="lazy" />
                        <img src={`${(`https://mysql-deploy-preprod.herokuapp.com/assets/actor/${actor.media_rounded}`)}`} alt="" loading="lazy" />
                        <img src={`${(`https://mysql-deploy-preprod.herokuapp.com/assets/actor/${actor.media_rounded}`)}`} alt="" loading="lazy" />
                    </div>
                </div>
            }
        </div>
    )
}

export default Artiste