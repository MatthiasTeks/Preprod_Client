import HomeActorMain from "../sections/home/HomeActorMain";
import HomeVideo from "../sections/home/HomeVideo";
import HomeActualite from "../sections/home/HomeActualite";
import HomeBandeDemo from "../sections/home/HomeBandeDemo";
import HomeTest from "../sections/home/HomeTest";
import HomePartner from "../sections/home/HomePartner";

const Home = () => {
    return (
        <div className="home">
            <HomeVideo />
            <HomeActualite />
            <HomeBandeDemo />
            <HomeActorMain />
            <HomeTest />
            <HomePartner />
        </div>
    )
}

export default Home