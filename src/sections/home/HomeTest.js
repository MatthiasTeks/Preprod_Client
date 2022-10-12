import { motion } from "framer-motion";
import Button from "../../components/Button";
import './HomeTest.css';

const HomeTest = () => {
    return (
        <div className="home-test flex column center justifyCenter">
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0}}
                transition={{ ease: "linear", duration: 1, delay: 0.2}}
                viewport={{ once: true }}
            >
                <h2 className="is2 is-white">DISCUTONS DE TON PROJET</h2>
                <p className="is4">
                    Notre proposition originale est de créer une bande démo qui te ressemble
                    afin que tu puisses librement disposer d'images qui te représente artistiquement.
                </p>
                <a href="https://www.instagram.com/lesfilmsdelabande/?hl=fr" target="_blank" rel="noreferrer">
                    <Button isWhite={true} text="Contacte nous"/>
                </a>
            </motion.div>
            {/* PATH SVG ONLY ON DESKTOP */}
            <svg id="home-test-svg-1" viewBox="0 0 100 100" version="1.1">
                <path fill="#F8F8F8"
                      d="M15.9,-16.7C18.4,-13.4,16.7,-6.7,13.9,-2.8C11.1,1.1,7.3,2.3,4.8,9.9C2.3,17.6,1.1,31.8,-3.9,35.7C-8.9,39.6,-17.8,33.2,-24.4,25.5C-31,17.8,-35.2,8.9,-35.5,-0.3C-35.7,-9.4,-32,-18.8,-25.4,-22.2C-18.8,-25.5,-9.4,-22.8,-1.4,-21.4C6.7,-20.1,13.4,-20.1,15.9,-16.7Z"
                      width="100%"
                      height="100%"
                      transform="translate(50 50)"
                      strokeWidth="0"
                      style={{transition: "all 0.3s ease 0s"}}
                      stroke="url(#sw-gradient)">

                </path>
            </svg>
            <svg id="home-test-svg-2" viewBox="0 0 100 100" version="1.1">
                <path fill="#F8F8F8"
                      d="M15.9,-16.7C18.4,-13.4,16.7,-6.7,13.9,-2.8C11.1,1.1,7.3,2.3,4.8,9.9C2.3,17.6,1.1,31.8,-3.9,35.7C-8.9,39.6,-17.8,33.2,-24.4,25.5C-31,17.8,-35.2,8.9,-35.5,-0.3C-35.7,-9.4,-32,-18.8,-25.4,-22.2C-18.8,-25.5,-9.4,-22.8,-1.4,-21.4C6.7,-20.1,13.4,-20.1,15.9,-16.7Z"
                      width="100%"
                      height="100%"
                      transform="translate(50 50)"
                      strokeWidth="0"
                      style={{transition: "all 0.3s ease 0s"}}
                      stroke="url(#sw-gradient)">

                </path>
            </svg>
        </div>
    )
}

export default HomeTest