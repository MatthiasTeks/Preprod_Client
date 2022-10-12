import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper';
import { motion } from "framer-motion";
import './HomeActorMain.css';

const HomeActorMain = () => {

    const [actorList, setActorList] = useState([]);
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })

        }

        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)

        }
    })

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
                { actorList &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ ease: "linear", duration: 1}}
                        viewport={{ once: true }}
                        className="holder-swiper flex row justifyCenter center"
                    >
                        <div className="home-actor-list">
                            { dimensions.width > 900 ?
                                <Swiper
                                    navigation={true}
                                    effect={"coverflow"}
                                    grabCursor={true}
                                    loop={true}
                                    coverflowEffect={{
                                        rotate: 50,
                                        stretch: 0,
                                        depth: 100,
                                        modifier: 1,
                                        slideShadows: false,
                                    }}
                                    modules={[Navigation, EffectCoverflow]}
                                    spaceBetween={10}
                                    breakpoints={{
                                        // when window width is >= 900px
                                        900: {
                                            width: 900,
                                            slidesPerView: 3,
                                        }
                                    }}
                                >
                                    {
                                        actorList.map((actor, index) => {
                                            return (
                                                <SwiperSlide key={`${actor.name}_${index}`} style={{height: "300px"}}>
                                                    <Link to={`les-artistes/${actor.name}`} >
                                                        <div className="actor-home-rounded">
                                                            <img
                                                                alt={actor.name}
                                                                src={`https://mysql-deploy-preprod.herokuapp.com/assets/actor/${actor.media_rounded}`}
                                                            />
                                                            <div className="holder-name flex column center justifyCenter">
                                                                <p className="is5">{actor.name}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                                :
                                <Swiper
                                    navigation={true}
                                    grabCursor={true}
                                    loop={true}
                                    modules={[Navigation]}
                                    spaceBetween={10}
                                    breakpoints={{
                                        100: {
                                            width: 100,
                                            slidesPerView: 1,
                                        }
                                    }}
                                >
                                    {
                                        actorList.map((actor, index) => {
                                            return (
                                                <SwiperSlide key={`${actor.name}_${index}`} style={{height: "300px"}}>
                                                    <Link to={`les-artistes/${actor.name}`} >
                                                        <div className="actor-home-rounded">
                                                            <img
                                                                alt={actor.name}
                                                                src={`https://mysql-deploy-preprod.herokuapp.com/assets/actor/${actor.media_rounded}`}
                                                            />
                                                            <div className="holder-name flex column center justifyCenter">
                                                                <p className="is5">{actor.name}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            }
                        </div>
                    </motion.div>
                }
            </div>
    )
}

export default HomeActorMain