import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import moment from 'moment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import InstagramIcon from '@mui/icons-material/Instagram';
import './HomeActualite.css';

const HomeActualite = () => {

    const [actu, setActu] = useState([]);

    useEffect(() => {
        fetch("https://mysql-deploy-preprod.herokuapp.com/home/news")
            .then((resp) => resp.json())
            .then((data) => setActu(data));
    }, [])

    return (
        <div className="home-actualite flex column justifyCenter center">
            <div className="home-actor-title flex column center justifyCenter">
                <h1>Notre actualité</h1>
                <hr/>
            </div>
            <div id="actualite-holder" className="flex row justifyCenter center">
                { actu &&
                    actu.map((actu, i) => {
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: -40 }}
                                whileInView={{ opacity: 1, y: 0}}
                                transition={{ ease: "linear", duration: 1, delay: i*0.1}}
                                viewport={{ once: true }}
                                key={`${actu.name}${i}`}
                            >
                                <Card sx={{ maxWidth: 325 }}>
                                    <CardMedia
                                        component="img"
                                        alt={actu.name}
                                        height="350"
                                        src={`https://mysql-deploy-preprod.herokuapp.com/assets/news/${actu.media}`}
                                    />
                                    <CardContent>
                                        <div className="flex row justifyBetween center">
                                            <h3>{actu.name}</h3>
                                            { actu.isInsta ?
                                                <a href={actu.linkInsta} rel="noreferrer" target="_blank">
                                                    <InstagramIcon />
                                                </a>
                                                : ""
                                            }
                                        </div>
                                        <p className="card-resume">{actu.resume}</p>
                                        <p className="card-detail">Les Films de la Bande - {moment(actu.date).format("YYYY-MM-DD hh:mm:ss")}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default HomeActualite