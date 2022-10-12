import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '../../components/Button';
import './ServicesNav.css';

const ServicesNav = ({ value, setValue }) => {

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <div id="service-nav" className="flex row">
            <div className="home-actor-title flex column center justifyCenter">
                <h1>Realise ta bande demo</h1>
                <hr/>
            </div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="nav tabs services" textColor="primary" indicatorColor="primary">
                    <Tab value="one" label="la séquence" id={value === "one" ? "tab-active" : ""}/>
                    <Tab value="two" label="la demi journée" id={value === "two" ? "tab-active" : ""}/>
                    <Tab value="three" label="la journée" id={value === "three" ? "tab-active" : ""}/>
                </Tabs>
            </Box>
            <Button isBlack={true} text="Contact" />
        </div>
    )
}

export default ServicesNav