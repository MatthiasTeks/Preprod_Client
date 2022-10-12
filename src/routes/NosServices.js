import { useState } from "react";
import ServicesNav from "../sections/nos-services/ServicesNav";
import ServiceComponent from "../sections/nos-services/ServiceComponent";
import ServiceInclude from "../sections/nos-services/ServicesInclude";
import { StepSequence } from "../utils/step-services/StepSequence";
import Img from '../assets/service.webp';

const NosServices = () => {
    const [value, setValue] = useState('one');

    return (
        <div className="services">
            <ServicesNav value={value} setValue={setValue}/>
            {value === "one" &&
                <>
                    <ServiceComponent
                        advice="Ce service est fait pour toi si tu es un acteur n'ayant pas de photo, ayant peu fait de tournage, tu as besoin d'un shooting et de rush, montage video, formation."
                        img={[{img: Img}]}
                        title="La séquence de tournage"
                        resume="Créer ta bande démo sur mesure sur une séquence de tournage complète."
                        step={StepSequence}
                        price="1750€"
                    />
                    <ServiceInclude service1={true} service2={true} service3={true} service4={true} />
                </>
            }
            {value === "two" &&
                <>
                    <ServiceComponent
                        advice="Ce service est fait pour toi si tu es un acteur n'ayant pas de photo, ayant peu fait de tournage, tu as besoin d'un shooting et de rush, montage video, formation."
                        img={[{img: Img}]}
                        title="La séquence de tournage"
                        resume="Créer ta bande démo sur mesure sur une séquence de tournage complète."
                        step={StepSequence}
                        price="1750€"
                    />
                    <ServiceInclude service1={true} service2={true} service3={true} service4={false} />
                </>
            }
            {value === "three" &&
                <>
                    <ServiceComponent
                        advice="Ce service est fait pour toi si tu es un acteur n'ayant pas de photo, ayant peu fait de tournage, tu as besoin d'un shooting et de rush, montage video, formation."
                        img={[{img: Img}]}
                        title="La séquence de tournage"
                        resume="Créer ta bande démo sur mesure sur une séquence de tournage complète."
                        step={StepSequence}
                        price="1750€"
                    />
                    <ServiceInclude service1={true} service2={true} service3={false} service4={false} />
                </>
            }
        </div>
    )
}

export default NosServices