import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Stack from "@mui/material/Stack";
import Skeleton from 'react-loading-skeleton'
import useMediaQuery from "@mui/material/useMediaQuery";
import Pagination from "@mui/material/Pagination";
import './ArtisteGallery.css';

const ArtisteGallery = ({ filterActor }) => {

    /* RESPONSIVE IMG LIST MUI */
    const matches = useMediaQuery('(min-width:900px)');

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

    return (
        <>
            <div className="artiste-gallery">
                { filterActor.length === 0 ?
                    <div className="skeleton-mv flex column justifyCenter center">
                        <div className="skeleton-row flex row justifyCenter center">
                            <Skeleton />
                            <Skeleton />
                        </div>
                        <div className="skeleton-row flex row justifyCenter center">
                            <Skeleton />
                            <Skeleton />
                        </div>
                        <div className="skeleton-row flex row justifyCenter center">
                            <Skeleton />
                            <Skeleton />
                        </div>
                    </div>
                    :
                    <ImageList cols={matches ? 4 : 1}>
                        {filterActor.map((item, i) => (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ ease: "linear", duration: 1, delay: (i * 0.2)}}
                                viewport={{ once: true }}
                            >
                                <ImageListItem key={`${item.media}${i}`}>
                                    <img
                                        className="img-actor"
                                        src={`${(`https://mysql-deploy-preprod.herokuapp.com/assets/actor/${item.media}`)}`}
                                        srcSet={`${(`https://mysql-deploy-preprod.herokuapp.com/assets/actor/${item.media}`)}`}
                                        alt={item.name}
                                        loading="lazy"
                                    />
                                    <div className="artiste-bar">
                                        <div className="artiste-name-holder">
                                            <Link to={`${item.name}`}>
                                                <div className="artiste-name flex row justifyCenter center">
                                                    <p>
                                                        {item.name}
                                                    </p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </ImageListItem>
                            </motion.div>
                        ))}
                    </ImageList>
                }
                <div id="pagination-movie" className="flex row justifyCenter center">
                    { filterActor !== 0 &&
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
            </div>
        </>
    )
}

export default ArtisteGallery