import {useEffect, useState} from "react";
import { motion } from "framer-motion";
import Skeleton from 'react-loading-skeleton'
import './ServiceComponent.css';

const ServiceComponent = (props) => {

    const [displayImg, setDisplayImg] = useState(false);

    useEffect(() => {
        const timer = setTimeout(setDisplayImg, 200, true);
        return () => {
            clearTimeout(timer);
        };
    }, [])

    return (
        <div className="service-sequence">
            <p>{props.advice}</p>
            <div className="service-content-holder flex row">
                <div className="holder-img flex column">
                    { displayImg ?
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ ease: "linear", duration: 0.5, delay: 0.1}}
                            viewport={{ once: true }}
                        >
                            <img className="service-img" src={props.img[0].img} alt=""/>
                        </motion.div>
                        :
                        <Skeleton />
                    }
                </div>
                <div className="service-content flex column">
                    <h2 id="service-title">{props.title}</h2>
                    <p>{props.resume}</p>
                    { props.step.map((step, i) => {
                        return (
                            <div key={`${step.name}-${i}`} className={`service-content-card ${(i+1) % 2 === 0 ? "" : "service-content-black"}`}>
                                <h3>{step.name}</h3>
                                <p>{step.resume}</p>
                            </div>
                        )
                    })}
                    <h2>Au prix de {props.price} HT</h2>
                </div>
            </div>
        </div>
    )
}

export default ServiceComponent