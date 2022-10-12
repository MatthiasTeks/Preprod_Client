import { useState, useEffect, forwardRef, useRef } from "react";
import { FormControl, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import moment from 'moment';
import Button from "../../components/Button";
import './MovieAdmin.css';
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MovieAdmin = () => {

    const [messageError, setMessageError] = useState(" Une erreur est survenue...")

    const uploadFiles = async (formData) => {
        fetch('https://mysql-deploy-preprod.herokuapp.com/movie/upload', {
            method: 'POST',
            body: formData,
        }).then((resp) => resp.json())
    }

    const typeOfMovie = (value, reverse) => {
        let type_movie;

        if(reverse){
            switch(value) {
                case "journee":
                    type_movie = 10;
                    break;
                case "demi-journee":
                    type_movie = 20;
                    break;
                case "sequence":
                    type_movie = 30;
                    break;
                default:
                    console.log('Error occurred')
            }
        } else {
            switch(typeNewPresta) {
                case 10:
                    type_movie = "journee";
                    break;
                case 20:
                    type_movie = "demi-journee";
                    break;
                case 30:
                    type_movie = "sequence";
                    break;
                default:
                    console.log('Error occurred')
            }
        }

        return type_movie
    }

    const fetchActor = () => {
        fetch("https://mysql-deploy-preprod.herokuapp.com/actor")
            .then((resp) => resp.json())
            .then((data) => {
                setActor(data)
            })
    }

    /* SNACKBAR ALERT */

    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);

    const handleAlertOpen = () => {
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, 1000);
    }

    const handleAlertOpenError = async (typeError) => {
        await setMessageError(typeError)
        await setOpenError(true)
        setTimeout(() => {
            setOpenError(false)
            setMessageError("Une erreur est survenue...")
        }, 3000);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false);
    };

    /* LOGIQUE METIER POUR LA CREATION D'UNE NOUVELLE VIDEO */

    const [typeNewPresta, setTypeNewPresta] = useState(10);
    const [uploadNewMovie, setNewUploadMovie] = useState();
    const [uploadNewMinia, setNewUploadMinia] = useState();

    const inputNewMovie = useRef(null);
    const inputNewMinia = useRef(null);

    const handleChangeNewPresta = (event) => {
        setTypeNewPresta(event.target.value);
    };

    const handleNewMovieChange = (e) => {
        setNewUploadMovie(e.target.files[0]);
    };

    const handleNewMiniaChange = (e) => {
        setNewUploadMinia(e.target.files[0]);
    };

    const handleSubmitNewMovie = async (e) => {
        e.preventDefault()

        if(uploadNewMovie.type === "video/webm"){
            if(uploadNewMinia.type === "image/webp"){
                console.log('hello')
                let formData = new FormData();
                formData.append('file', uploadNewMovie)
                formData.append('file', uploadNewMinia)
                await uploadFiles(formData)

                let date = new Date();
                let current_date = moment(date).format("YYYY-MM-DD hh:mm:ss")

                axios
                    .post(`https://mysql-deploy-preprod.herokuapp.com/movie/create`, {
                        type_movie: typeOfMovie(),
                        media_img: uploadNewMinia.name,
                        media_movie: uploadNewMovie.name,
                        name_movie: "Test",
                        date: current_date
                    }).then(resp => resp.status === 201 ? successfulNewMovie() : handleAlertOpenError("Une erreur est survenue..."))
            } else {
                await handleAlertOpenError("Format miniature incorrect (.webp obligatoire)")
            }
        } else {
            await handleAlertOpenError("Format video incorrect (.webm obligatoire)")
        }
    }

    const successfulNewMovie = () => {
        handleAlertOpen()
        setTypeNewPresta(10)
        inputNewMovie.current.value = null;
        inputNewMinia.current.value = null;
    }

    /* LOGIQUE METIER POUR LA MISE A JOUR VIDEO EXISTANTE */

    const [actor, setActor] = useState([]);
    const [typePrestaChecked, setTypePrestaChecked] = useState(null);
    const [checkedMovie, setCheckedMovie] = useState(false);
    const [checkedMinia, setCheckedMinia] = useState(false);
    const [uploadMovieChecked, setUploadMovieChecked] = useState();
    const [uploadMiniaChecked, setUploadMiniaChecked] = useState();

    const inputChangeMovie = useRef(null);
    const inputChangeMinia = useRef(null);

    const handleChangeAutoComplete = (e, value) => {
        setTypePrestaChecked(typeOfMovie(value.type_movie, true))
    }

    const handleChangeChecked = (event) => {
        setTypePrestaChecked(event.target.value);
    };

    const handleChangeCheckedMovie = () => {
        setCheckedMovie(!checkedMovie)
    }

    const handleChangeCheckedMinia = () => {
        setCheckedMinia(!checkedMinia)
    }

    const handleMovieCheckedChange = (e) => {
        setUploadMovieChecked(e.target.files[0]);
    };

    const handleMiniaCheckedChange = (e) => {
        setUploadMiniaChecked(e.target.files[0]);
    };

    const handleSubmitChangeMovie = async (e) => {
        e.preventDefault()

        // set l'acteur en question
        let actorChanged = actor.find(actor => actor.label === e.target[0].defaultValue);

        let formData = new FormData();
        let media_img;
        let media_movie;

        // UPLOAD IF NEW VIDEO OR MINIA CHECKED BY USER
        if(uploadMovieChecked || uploadMiniaChecked){
            if(uploadMovieChecked){
                if(uploadMovieChecked.type === "video/webm"){
                    formData.append('file', uploadMovieChecked)
                    media_movie = uploadMovieChecked.name;
                } else {
                    await handleAlertOpenError()
                    throw new Error("Something went badly wrong!");
                }
            } else {
                media_movie = actorChanged.media_movie;
            }
            if(uploadMiniaChecked){
                if(uploadMiniaChecked.type === "image/webp"){
                    formData.append('file', uploadMiniaChecked)
                    media_img = uploadMiniaChecked.name;
                } else {
                    await handleAlertOpenError()
                    throw new Error("Something went badly wrong!");
                }
            } else {
                media_img = actorChanged.media_img;
            }
            await uploadFiles(formData)
        } else {
            media_movie = actorChanged.media_movie;
            media_img = actorChanged.media_img;
        }

        axios
            .post(`https://mysql-deploy-preprod.herokuapp.com/movie/update`, {
                type_movie: typeOfMovie(typePrestaChecked),
                media_img: media_img,
                media_movie: media_movie,
                name_movie: "Test",
                id_movie: actorChanged.id_movie
            }).then((resp) => resp.status === 200 ? successfulChangeMovie() : handleAlertOpenError())
    }

    const successfulChangeMovie = () => {
        handleAlertOpen()
        if(checkedMovie === true){
            inputChangeMovie.current.value = null
        }
        if(checkedMinia === true){
            inputChangeMinia.current.value = null
        }
    }

    // FETCH ALL VIDEO FROM ACTOR PAGE
    useEffect(() => {
        fetchActor()
    }, [])

    return (
        <div className="movie-admin">
            <h1>PANEL ADMINISTRATEUR</h1>
            <h2>Bande Demo</h2>
            <div id="movie-admin-form" className="dashboard-home">
                {/* ------ NEW VIDEO ------*/}
                <div className="movie-admin-content flex column">
                    <h3>Ajout d'une nouvelle vidéo</h3>
                    <form onSubmit={(e) => handleSubmitNewMovie(e)}>
                        {/* SELECT TYPE OF MOVIE */}
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={typeNewPresta}
                                label="Type"
                                onChange={handleChangeNewPresta}
                            >
                                <MenuItem value={10}>Journée</MenuItem>
                                <MenuItem value={20}>Demi journée</MenuItem>
                                <MenuItem value={30}>Séquence</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="send-movie-form flex row justifyBetween">
                            {/* MOVIE UPLOAD */}
                            <div className="send-movie-bloc flex column">
                                <label htmlFor="file-movie" className="isTitle">Fichier film</label>
                                <input
                                    type="file"
                                    name="file-movie"
                                    accept=".webm"
                                    ref={inputNewMovie}
                                    onChange={(e) => handleNewMovieChange(e)}
                                    required
                                />
                            </div>
                            {/* MINIA UPLOAD */}
                            <div>
                                <div className="send-movie-bloc flex column">
                                    <label htmlFor="file-minia" className="isTitle">Fichier miniature</label>
                                    <input
                                        type="file"
                                        name="file-minia"
                                        accept=".webp"
                                        ref={inputNewMinia}
                                        onChange={(e) => handleNewMiniaChange(e)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <Button isBlack={true} text="Enregister" type="submit" size="button-low"/>
                    </form>
                </div>
                {/* ------ UPDATE VIDEO ------*/}
                <div className="movie-admin-content flex column">
                    <h3>Modification d'une vidéo</h3>
                    { actor.length &&
                        <form onSubmit={(e) => handleSubmitChangeMovie(e)}>
                            {/* SELECT WHICH ACTOR */}
                            <Autocomplete
                                disablePortal
                                options={actor}
                                sx={{ width: 300 }}
                                defaultValue={actor[0]}
                                onChange={handleChangeAutoComplete}
                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                renderInput={(params) => <TextField {...params} label="acteur" required={true}/>}
                            />
                            {/* SELECT TYPE OF MOVIE */}
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={typePrestaChecked !== null ? typePrestaChecked : actor.length ? typeOfMovie(actor[0].type_movie, true) : 10}
                                    label="Type"
                                    onChange={handleChangeChecked}
                                >
                                    <MenuItem value={10}>Journée</MenuItem>
                                    <MenuItem value={20}>Demi journée</MenuItem>
                                    <MenuItem value={30}>Séquence</MenuItem>
                                </Select>
                            </FormControl>
                            {/* SWITCH */}
                            <div className="switch-holder flex row justifyEvenly center">
                                <div className="flex row justifyCenter center">
                                    <p>changer la video de l'acteur </p>
                                    <Switch
                                        checked={checkedMovie}
                                        onChange={handleChangeCheckedMovie}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </div>
                                <div className="flex row justifyCenter center">
                                    <p>changer la miniature de sa vidéo </p>
                                    <Switch
                                        checked={checkedMinia}
                                        onChange={handleChangeCheckedMinia}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </div>
                            </div>
                            { checkedMovie &&
                                <div className="send-movie-bloc flex column">
                                    <label htmlFor="file-movie" className="isTitle">Fichier film</label>
                                    <input
                                        type="file"
                                        name="file-movie"
                                        accept=".webm"
                                        ref={inputChangeMovie}
                                        onChange={(e) => handleMovieCheckedChange(e)}
                                        required
                                    />
                                </div>
                            }
                            {
                                checkedMinia &&
                                <div className="send-movie-bloc flex column">
                                    <label htmlFor="file-minia" className="isTitle">Fichier miniature</label>
                                    <input
                                        type="file"
                                        name="file-minia"
                                        accept=".webp"
                                        ref={inputChangeMinia}
                                        onChange={(e) => handleMiniaCheckedChange(e)}
                                        required
                                    />
                                </div>
                            }
                            {/* SAVE */}
                            <Button isBlack={true} text="Enregister" type="submit" size="button-low"/>
                        </form>
                    }
                </div>
            </div>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Modification enregistré !
                    </Alert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                    <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                        {messageError}
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    )
}

export default MovieAdmin