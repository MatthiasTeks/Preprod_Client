import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import './HomePartner.css';

const HomePartner = () => {

    const [partnerList, setPartnerList] = useState([]);

    useEffect(() => {
        fetch("https://mysql-deploy-preprod.herokuapp.com/home/partner")
            .then((resp) => resp.json())
            .then((data) => setPartnerList(data));
    }, [])

    return (
        <div className="home-partner flex column justifyCenter center">
            <div className="home-actor-title flex column center justifyCenter">
                <h1>Nos partenaires</h1>
                <hr/>
            </div>
            <div className="partner-holder flex row justifyCenter center">
                <Marquee gradient={false}>
                    { partnerList &&
                        partnerList.map((partner, i) => {
                            return (
                                <div className="partner-card" key={`${partner.name}${i}`}>
                                    <img src={`https://mysql-deploy-preprod.herokuapp.com/assets/partner/${partner.media}`} alt={partner.name}/>
                                </div>
                            )
                        })
                    }
                </Marquee>
            </div>
        </div>
    )
}

export default HomePartner