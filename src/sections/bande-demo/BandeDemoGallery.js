import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactPlayer from 'react-player'
import Skeleton from 'react-loading-skeleton'
import useMediaQuery from '@mui/material/useMediaQuery';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchBar from "../../components/SearchBar";
import './BandeDemoGallery.css';

const BandeDemoGallery = () => {

    /* DATA COLLECT */
    const [actor, setActor] = useState([]);

    /* INPUT SEARCH */
    const [filterActor, setFilterActor] = useState([]);
    const [inputText, setInputText] = useState("");

    /* FILTER BUTTON */
    const [activeFilter, setActiveFilter] = useState('default')

    /* STORE IF MOVIE OPEN OR NOT */
    const [open, setOpen] = useState(false);

    /* STORE MOVIE OPENED, TO DISPLAY HIS INFORMATION */
    const [movieOpen, setMovieOpen] = useState("");

    /* RESPONSIVE IMG LIST MUI*/
    const matches = useMediaQuery('(min-width:900px)');

    const handleOpen = (movie) => {
        window.scrollTo(0, 0)
        setOpen(true);
        setMovieOpen(movie)
    }

    /* FILTERED FUNCTION */
    const filterName = (e) => {
        setActiveFilter('all')
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

    const filterDemo = () => {
        setInputText("")
        setFilterActor(actor.filter(actor => actor.type_movie === 'journee'))
    }

    const filterTape= () => {
        setInputText("")
        setFilterActor(actor.filter(actor => actor.type_movie === 'sequence'))
    }

    const handleClick = (e) => {
        setActiveFilter(e.target.id)
        if(e.target.id === 'default'){
            filterDemo()
        } else if(e.target.id === 'select2'){
            filterTape()
        }
    }

    const fetchData = () => {
        fetch("https://mysql-deploy-preprod.herokuapp.com/actor")
            .then((resp) => resp.json())
            .then((data) => {
                setActor(data);
                setFilterActor(data.filter(data => data.type_movie === 'journee'));
            })
    }

    /* COUNT PAGE DEPEND OF RESULT LENGTH */
    const setPagination = () => {
        let resultCount = filterActor.length;
        let paginationCount;

        if(resultCount <= 6){
            paginationCount = 1;
        } else {
            paginationCount = Math.ceil(resultCount / 6);
        }
        return paginationCount;
    }

    useEffect(() => {
        const timer = setTimeout(fetchData, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [])

    return (
        <div className="bande-demo-gallery flex column">
            <div id="holder-search" className="flex row justifyEnd center">
                <SearchBar
                    default="Bande Demo"
                    select2="Self Tape"
                    placeholder="Rechercher un acteur"
                    handleClick={handleClick}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    filterName={filterName}
                    filterAll={filterAll}
                    filterJournee={filterDemo}
                    filterDemiJournee={filterTape}
                    inputText={inputText}
                    setInputText={setInputText}
                />
            </div>
            { filterActor.length === 0 ?
                <div className="skeleton-mv flex column justifyCenter center">
                    <div className="skeleton-row">
                        <Skeleton />
                        <Skeleton />
                    </div>
                    <div className="skeleton-row skeleton-mobile-disappear">
                        <Skeleton />
                        <Skeleton />
                    </div>
                    <div className="skeleton-row skeleton-mobile-disappear">
                        <Skeleton />
                        <Skeleton />
                    </div>
                </div>
                :
                <ImageList cols={matches ? 2 : 1}>
                    {filterActor.map((item, i) => (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ ease: "linear", duration: 1, delay: (i * 0.2)}}
                            viewport={{ once: true }}
                        >
                            <ImageListItem key={`${item.name}${i}`} className="demo-item">
                                <img
                                    className="img-movie"
                                    src={`${(`https://mysql-deploy-preprod.herokuapp.com/assets/movie/${item.media_img}`)}`}
                                    srcSet={`${(`https://mysql-deploy-preprod.herokuapp.com/assets/movie/${item.media_img}`)}`}
                                    alt={item.name_movie}
                                    loading="lazy"
                                />
                                <div className="movie-bar">
                                    <div className="movie-name-holder">
                                        <div className="movie-name flex row justifyStart center" onClick={() => handleOpen(item)}>
                                            <p>
                                                {item.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ImageListItem>
                        </motion.div>
                    ))}
                </ImageList>
            }
            <div id="pagination-movie" className="flex row justifyCenter center">
                { filterActor.length !== 0 &&
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ ease: "linear", duration: 1, delay: 2}}
                            viewport={{ once: true }}
                        >
                        <Stack spacing={2}>
                            <Pagination count={setPagination()} variant="outlined" shape="rounded" />
                        </Stack>
                    </motion.div>
                }
            </div>
            { open &&
                <div className="movie-played-holder">
                    <div className="movie-played flex column justifyCenter center">
                        <div className="movie-played-header flex row center justifyBetween">
                            <div className="movie-played-header-content flex row center justifyStart">
                                <h2>{movieOpen.name}</h2>
                                <p> - vidéo une {movieOpen.type_movie}</p>
                            </div>
                            <HighlightOffIcon onClick={() => setOpen(false)}/>
                        </div>
                        <ReactPlayer
                            controls={true}
                            width='100%'
                            height='100%'
                            url={`https://mysql-deploy-preprod.herokuapp.com/assets/movie/${movieOpen.media_movie}`}
                            className="movie-player"
                        />
                    </div>
                </div>
            }
            {
                open &&
                <div className="movie-filter" />
            }
        </div>
    )
}

export default BandeDemoGallery