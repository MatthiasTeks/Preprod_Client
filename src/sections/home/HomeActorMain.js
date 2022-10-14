import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Carousel from "nuka-carousel";
import './HomeActorMain.css';

const HomeActorMain = (props) => {

    const [actorList, setActorList] = useState([]);
    const [deviceTypeScreen, setDeviceTypeScreen] = useState("");

    const disableDragging = (e) => {
        e.preventDefault();
        return false;
    }
    const getDeviceType = () => {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return "tablet";
        }
        if (
            /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
                ua
            )
        ) {
            return "mobile";
        }
        return "desktop";
    };

    useEffect(() => {
        setDeviceTypeScreen(getDeviceType())
    }, [])

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
                        deviceTypeScreen === "desktop" ?
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