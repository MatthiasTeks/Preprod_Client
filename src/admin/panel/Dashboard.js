import { useState, useEffect, forwardRef } from 'react';
import { TextField } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from "@mui/material/Stack";
import Button from '../../components/Button.js';
import axios from "axios";
import './Dashboard.css';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard = () => {

    // STORE ACTUAL MEDIA AND UPLOADED MEDIA
    const [uploadMedia, setUploadMedia] = useState();

    // STORE ACTOR GLOBAL & ACTOR HOME
    const [actorList, setActorList] = useState([]);
    const [actorHome, setActorHome] = useState([]);

    /* SNACKBAR ALERT */
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);

    // FETCH ACTORS, ACTOR HOME, MEDIA HOME
    const fetchAllData = () => {
        fetch("https://mysql-deploy-preprod.herokuapp.com/actor")
            .then((resp) => resp.json())
            .then((data) => setActorList(data))
        fetch("https://mysql-deploy-preprod.herokuapp.com/home/actor")
            .then((resp) => resp.json())
            .then((data) => setActorHome(data))
    }

    // ON SUBMIT FORM, THIS FUNCTION WILL UPDATE THE NEW HOME MEDIA
    const handleSubmitMedia = async (e) => {
        e.preventDefault();
        if(uploadMedia.type === "video/webm"){
            let formData = new FormData();
            formData.append('file', uploadMedia)
            await fetch('https://mysql-deploy-preprod.herokuapp.com/home/media/update', {
                method: 'POST',
                body: formData,
            }).then((resp) => resp.status === 200 ? handleAlertOpen() : handleAlertOpenError())
        } else {
            await handleAlertOpenError()
        }
    }

    // UPDATE ACTOR ON HOME PAGE
    const handleSubmitActor = (e) => {
        e.preventDefault();
        console.log(e.target[0].defaultValue)
        let actor = [
            {
                actorHome: 1,
                actorList: actorList.find(actor => actor.label === e.target[0].defaultValue).id_actor
            },
            {
                actorHome: 2,
                actorList: actorList.find(actor => actor.label === e.target[4].defaultValue).id_actor
            },
            {
                actorHome: 3,
                actorList: actorList.find(actor => actor.label === e.target[8].defaultValue).id_actor
            },
            {
                actorHome: 4,
                actorList: actorList.find(actor => actor.label === e.target[12].defaultValue).id_actor
            },
            {
                actorHome: 5,
                actorList: actorList.find(actor => actor.label === e.target[16].defaultValue).id_actor
            }]

        actor.forEach(actor => {
            axios
                .post(`https://mysql-deploy-preprod.herokuapp.com/home/actor/update`, {
                    actorList: actor.actorList,
                    actorHome: actor.actorHome,
                }).then(r => r.status === 200 ? handleAlertOpen() : handleAlertOpenError() )
        })
    }

    // DETECT WHEN FILE INPUT HOME MEDIA CHANGE AND STORE IT ON STATE UPLOAD IMG
    const handleMediaChange = (e) => {
        setUploadMedia(e.target.files[0])
    };

    const handleAlertOpen = async () => {
        await setOpen(true)
        const timer = setTimeout(() => {
            setOpen(false)
        }, 1000);
        return () => clearTimeout(timer);
    }

    const handleAlertOpenError = async () => {
        await setOpenError(true)
        const timer = setTimeout(() => {
            setOpenError(false)
        }, 1000);
        return () => clearTimeout(timer);
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

    useEffect(() => {
        fetchAllData()
    }, [])

    return (
        <div className="dashboard">
            <h1>PANEL ADMINISTRATEUR</h1>
            <h2>Dashboard</h2>
            <div id="dashboard-media" className="dashboard-home">
                <div className="dashboard-content flex column">
                    <h3>Vidéo de la page d'accueil</h3>
                    <form onSubmit={(e) => handleSubmitMedia(e)}>
                        <div>
                            <input
                                type="file"
                                name="home_media.mp4"
                                accept=".webm"
                                onChange={(e) => handleMediaChange(e)}
                                required
                            />
                            <Button isBlack={true} text="Enregister" type="submit" size="button-low"/>
                        </div>
                    </form>
                </div>
            </div>
            <div id="dashboard-acteur" className="dashboard-home">
                <div className="dashboard-content flex column">
                    <h3>Acteurs mis en avant en page d'accueil</h3>
                    { actorList.length &&
                        actorHome.length &&
                            <form onSubmit={(e) => handleSubmitActor(e)}>
                                <div className="dashboard-select flex row justifyCenter center">
                                    { actorHome.map((actor, i) => {
                                        return (
                                            <Autocomplete
                                                key={`${actor.label}${i}`}
                                                disablePortal
                                                options={actorList}
                                                sx={{ width: 300 }}
                                                defaultValue={actorList.find(actor => actor.label === actorHome.find(actorHome => actorHome.id_home_actors === (i+1)).label).label}
                                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                                renderInput={(params) => <TextField {...params} label={`acteur ${i+1}`} required={true}/>}
                                            />
                                        )
                                    })}
                                </div>
                                <Button isBlack={true} text="Enregistrer" size="button-low"/>
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
                        Un problème est survenue...
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    )
}

export default Dashboard