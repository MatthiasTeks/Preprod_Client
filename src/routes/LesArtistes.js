import { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';
import SearchBar from "../components/SearchBar";
import ArtisteGallery from "../sections/les-artistes/ArtisteGallery";

const LesArtistes = () => {

    /* DATA COLLECT */
    const [actor, setActor] = useState([]);

    /* INPUT SEARCH */
    const [filterActor, setFilterActor] = useState([]);
    const [inputText, setInputText] = useState("");

    /* FILTER BUTTON */
    const [activeFilter, setActiveFilter] = useState('default')

    const fetchData = () => {
        fetch("https://mysql-deploy-preprod.herokuapp.com/actor")
            .then((resp) => resp.json())
            .then((data) => {
                setActor(data);
                setFilterActor(data);
            })
    }

    const filterName = (e) => {
        setActiveFilter('default')
        const filtered =
            actor &&
            actor.filter((item) => {
                return item.name.toLowerCase().startsWith(e.toLowerCase());
            });
        setFilterActor(filtered);
    };

    const filterAll = () => {
        setInputText("")
        fetch(`https://mysql-deploy-preprod.herokuapp.com/actor`)
            .then((resp) => resp.json())
            .then((data) => setFilterActor(data));
    }

    const filterSexe = (sexe) => {
        setInputText("")
        fetch(`https://mysql-deploy-preprod.herokuapp.com/actor/sexe/${sexe}`)
            .then((resp) => resp.json())
            .then((data) => setFilterActor(data));
    }

    const handleClick = (e) => {
        setActiveFilter(e.target.id)
        if(e.target.id === 'default'){
            filterAll()
        } else if(e.target.id === 'select2'){
            filterSexe("man")
        } else if(e.target.id === 'select3'){
            filterSexe("woman")
        }
    }

    useEffect(() => {
        const timer = setTimeout(fetchData, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [])
    
    return (
        <div className="artiste-dlb">
            <SearchBar
                default="Tous"
                select2="Comédien"
                select3="Comédienne"
                placeholder="Rechercher un acteur"
                isSelect3={true}
                handleClick={handleClick}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                filterName={filterName}
                filterAll={filterAll}
                filterSexe={filterSexe}
                inputText={inputText}
                setInputText={setInputText}
            />
            <ArtisteGallery
                filterActor={filterActor}
                setFilterActor={setFilterActor}
            />
            <Outlet />
        </div>
    )
}

export default LesArtistes