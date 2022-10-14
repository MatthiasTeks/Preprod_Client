import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Carousel from "nuka-carousel";
import './HomeActorMain.css';

const HomeActorMain = (props) => {

    const [actorList, setActorList] = useState([]);

    const disableDragging = (e) => {
        e.preventDefault();
        return false;
    }

    useEffect(() => {
        fetch("https://mysql-deploy-preprod.herokuapp.com/home/actor")
            .then((resp) => resp.json())
            .then((data) => setActorList(data));
    }, [])

    return (
            <div className="home-actor-main flex column justifyCenter center">
                <div className="home-actor-title flex column center justifyCenter">
                    <h1>Ils ont decroche un agent</h1>
                    <hr/>
                </div>
                <div className="lel">
                    { actorList &&
                        props.deviceTypeScreen === "desktop" ?
                            <Carousel wrapAround={true} slidesToShow={3} dragging={true}>
                                { actorList.map((actor, index) => {
                                    return (
                                        <div onDragStart={disableDragging} key={`${actor.name}_${index}`}>
                                            <img
                                                alt={actor.name}
                                                src={`https://mysql-deploy-preprod.herokuapp.com/assets/actor/${actor.media_rounded}`}
                                            />
                                            <Link to={`les-artistes/${actor.name}`} className="holder-name flex column justifyCenter center">
                                                <p className="is5">{actor.name}</p>
                                            </Link>
                                        </div>
                                    )})
                                }
                            </Carousel>
                        :
                            <Carousel wrapAround={true} slidesToShow={1} dragging={true}>
                                { actorList.map((actor, index) => {
                                    return (
                                        <div onDragStart={disableDragging} key={`${actor.name}_${index}`}>
                                            <img
                                                alt={actor.name}
                                                src={`https://mysql-deploy-preprod.herokuapp.com/assets/actor/${actor.media_rounded}`}
                                            />
                                            <Link to={`les-artistes/${actor.name}`} className="holder-name flex column justifyCenter center">
                                                <p className="is5">{actor.name}</p>
                                            </Link>
                                        </div>
                                    )})
                                }
                            </Carousel>
                    }
                </div>
            </div>
    )
}

export default HomeActorMain