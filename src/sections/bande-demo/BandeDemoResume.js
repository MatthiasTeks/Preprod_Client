import { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import './BandeDemoResume.css';

const BandeDemoResume = () => {
    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <div id="bande-demo-resume" className="flex row">
            <div id="bande-demo-resume-holder" className="flex column start justifyCenter blackText" style={{height: "100%", width:"100%"}}>
                <div className="flex column" style={{ width: "100%" }}>
                    <h2 className="is2">Une { value === "one" ? "bande démo" : "self-tape"}, c'est quoi ?</h2>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', width: "100%" }}>
                        <Tabs value={value} onChange={handleChange} aria-label="nav tabs services" textColor="primary" indicatorColor="primary">
                            <Tab value="one" label="bande demo" id={value === "one" ? "tab-active" : ""}/>
                            <Tab value="two" label="self tape" id={value === "two" ? "tab-active" : ""}/>
                        </Tabs>
                    </Box>
                </div>
                <div id="bande-demo-resume-content" className="flex column">
                        {  value === "one" ?
                            <p className="is5">
                                La bande démo c'est ton CV visuel.
                                C'est la meme chose qu'un book photo mais mis en image.
                                C'est la premiere image que l'on voit de toi lors d'un casting.
                                La bande démo c'est ton CV visuel. C'est la meme chose qu'un book photo mais mis en image.
                                C'est la premiere image que l'on voit de toi lors d'un casting. La bande démo c'est ton CV visuel.
                                C'est la meme chose qu'un book photo mais mis en image. C'est la premiere image que l'on voit de toi lors d'un casting.
                                La bande démo c'est ton CV visuel. C'est la meme chose qu'un book photo mais mis en image.
                                C'est la premiere image que l'on voit de toi lors d'un casting. La bande démo c'est ton CV visuel.
                                C'est la meme chose qu'un book photo mais mis en image. C'est la premiere image que l'on voit de toi lors d'un casting.
                            </p>
                            :
                            <p className="is5">
                                La self-tape c'est ton CV visuel.
                                C'est la meme chose qu'un book photo mais mis en image.
                                C'est la premiere image que l'on voit de toi lors d'un casting.
                                La bande démo c'est ton CV visuel. C'est la meme chose qu'un book photo mais mis en image.
                                C'est la premiere image que l'on voit de toi lors d'un casting. La bande démo c'est ton CV visuel.
                                C'est la meme chose qu'un book photo mais mis en image. C'est la premiere image que l'on voit de toi lors d'un casting.
                                La bande démo c'est ton CV visuel. C'est la meme chose qu'un book photo mais mis en image.
                                C'est la premiere image que l'on voit de toi lors d'un casting. La bande démo c'est ton CV visuel.
                                C'est la meme chose qu'un book photo mais mis en image. C'est la premiere image que l'on voit de toi lors d'un casting.
                            </p>
                        }
                </div>
            </div>
        </div>
    )
}

export default BandeDemoResume