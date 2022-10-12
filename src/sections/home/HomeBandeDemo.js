import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import './HomeBandeDemo.css';

const HomeBandeDemo = () => {
    return (
        <div className="home-bande-demo flex column justifyCenter">
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0}}
                transition={{ ease: "linear", duration: 1, delay: 0.4}}
                viewport={{ once: true }}
            >
                <div id="home-bande-demo-holder" className="flex column start justifyCenter" style={{height: "100%", width: "100%"}}>
                    <h2 className="is2">Une bande démo, c'est quoi ?</h2>
                    <div className="home-bande-demo-resume flex column">
                        <p className="is5">C'est plusieurs séquences qui montrent ton jeu d'acteur.</p>
                        <p className="is5">La bande démo c'est ton CV visuel. C'est la meme chose qu'un book photo mais mis en image. C'est la premiere image que l'on voit de toi lors d'un casting et c'est avant tout, ton premier lien avec ton agent. Il est donc indispensable qu'elle te mette en valeur artistiquement.</p>
                    </div>
                    <Link to="bande-demo" onClick={() => window.scrollTo(0, 0)}>
                        <Button isWhite={true} text="En savoir plus"/>
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

export default HomeBandeDemo