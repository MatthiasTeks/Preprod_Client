import { useRef, useState } from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Stepper, Step, StepLabel } from "@mui/material";
import { StepTest } from "../../utils/StepTest";
import Button from "../../components/Button";
import './LeTest.css';

const LeTest = () => {
    /* STORE AT WHICH QUESTION USER IS */
    const [activeStep, setActiveStep] = useState(0);

    /* STORE IF CHECKBOX IS CHECKED */
    const [responseBox, setResponseBox] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
    });

    /* STORE USER INFORMATION */
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [number, setNumber] = useState('');

    /* RETURN IF MORE THAN 1 CHECKBOX IS CHECKED TO DISPLAYED ERROR */
    const { checkbox1, checkbox2 , checkbox3 } = responseBox;
    const error = [checkbox1, checkbox2, checkbox3].filter((v) => v).length !== 1;

    /* STORE IF USER CHECKED LEGAL RECONTACT BEFORE SEND FORM */
    const [legalCheckbox, setLegalCheckbox] = useState(false);

    /* REF TO RESPONSE */
    const inputResponse1 = useRef()
    const inputResponse2 = useRef()
    const inputResponse3 = useRef()

    /* STORE ALL USERS FORM RESPONSE */
    const [responseForm, setResponseForm] = useState([
        {
            question: 1,
            response: false
        },
        {
            question: 2,
            response: false
        },
        {
            question: 3,
            response: false
        },
        {
            question: 4,
            response: false
        },
        {
            question: 5,
            response: false
        },
        {
            question: 6,
            response: false
        },
        {
            question: 7,
            response: false
        },
        {
            question: 8,
            response: false
        },
        {
            question: 9,
            response: false
        },
        {
            question: 10,
            response: false
        }
    ])

    /* HANDLE NEXT BUTTON */
    const handleNext = () => {
        if(activeStep === 0){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            if(error){
                console.log(error)
            } else {
                setResponseForm(current => current.map(obj => {
                    if(obj.question === activeStep){
                        if(checkbox1 === true){
                            return {...obj, response: inputResponse1.current.innerText}
                        } else if(checkbox2 === true){
                            return {...obj, response: inputResponse2.current.innerText}
                        } else if(checkbox3 === true){
                            return {...obj, response: inputResponse3.current.innerText}
                        }
                    }

                    return obj
                }))
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setResponseBox({
                    checkbox1: false,
                    checkbox2: false,
                    checkbox3: false,
                });
            }
        }
    };

    /* HANDLE CHECK */
    const handleToggle = (event) => {
        setResponseBox({
            ...responseBox,
            [event.target.name]: event.target.checked,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(responseForm, name, number, mail)
    }

    return (
        <div className="le-test">
            <div className="test-title flex column justifyStart center">
                {/* STEPPER RIGHT SIDE */}
                <Stepper activeStep={activeStep-1} orientation="horizontal">
                    {StepTest.map((step, index) => (
                        index !== 0 &&
                        index < 11 &&
                        <Step key={`${step.label}-${index}`}>
                            <StepLabel>
                                {step.label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
            <div className="test-holder flex row">
                <div id="test-container" className="flex column">
                    <h2>{StepTest[activeStep].name}</h2>
                    <hr/>
                    { activeStep === 0 &&
                        <>
                            <p>{StepTest[activeStep].resume} </p>
                            <Button isBlack={true} text="Commencer" onClick={() => handleNext()}/>
                        </>
                    }
                    {/* QUESTIONS PART */}
                    { activeStep > 0 &&
                        activeStep < 11 &&
                        <>
                            <FormControl
                                required
                                error={error}
                                component="fieldset"
                                sx={{ m: 3 }}
                                variant="standard"
                            >
                                <FormLabel component="legend">Choisissez une réponse : </FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={checkbox1} onChange={handleToggle} name="checkbox1" />
                                        }
                                        label={StepTest[activeStep].choice1}
                                        ref={inputResponse1}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={checkbox2} onChange={handleToggle} name="checkbox2" />
                                        }
                                        label={StepTest[activeStep].choice2}
                                        ref={inputResponse2}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={checkbox3} onChange={handleToggle} name="checkbox3" />
                                        }
                                        label={StepTest[activeStep].choice3}
                                        ref={inputResponse3}
                                    />
                                </FormGroup>
                            </FormControl>
                            {/* NEXT BUTTON  */}
                            <Button isBlack={true} text="Continuer" onClick={() => handleNext()}/>
                        </>
                    }
                    {/* WHEN USER COMPLETED ALL QUESTION, NEED TO FILL FORM CONTACT */}
                    { activeStep === 11 &&
                        <form id="form-submit-test" onSubmit={(e) => handleSubmit(e)}>
                            <FormControl required sx={{ m: 3 }} variant="standard" className="test-finish" onSubmit={() => console.log('end')}>
                                <TextField required id="standard-basic" label="Nom complet" variant="standard" focused onChange={(e) => setName(e.target.value)}/>
                                <TextField required id="standard-basic" label="Adresse mail" variant="standard" focused onChange={(e) => setMail(e.target.value)}/>
                                <TextField required id="standard-basic" label="Numéro de téléphone" variant="standard" focused onChange={(e) => setNumber(e.target.value)} />
                                <div className="flex row center">
                                    <Checkbox onChange={() => setLegalCheckbox(!legalCheckbox)} required/>
                                    <p className="is-white">J'accepte d'etre recontacté</p>
                                </div>
                                <button type="submit">ENVOYER</button>
                            </FormControl>
                        </form>
                    }
                </div>
            </div>
        </div>
    )
}

export default LeTest