import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './SearchBar.css';

const SearchBar = (props) => {
    return (
        <div className="search-bar flex row">
            <Box sx={{ '& button': { m: 1 } }}>
                <Button
                    variant={props.activeFilter === "default" ? "contained" : "outlined"}
                    size="small"
                    id="default"
                    onClick={(e) => props.handleClick(e)}
                >
                    {props.default}
                </Button>
                <Button
                    variant={props.activeFilter === "select2" ? "contained" : "outlined"}
                    size="small"
                    id="select2"
                    onClick={(e) => props.handleClick(e)}
                >
                    {props.select2}
                </Button>
                { props.isSelect3 &&
                    <Button
                        variant={props.activeFilter === "select3" ? "contained" : "outlined"}
                        size="small"
                        id="select3"
                        onClick={(e) => props.handleClick(e)}
                    >
                        {props.select3}
                    </Button>
                }

                {  props.isSelect4 &&
                    <Button
                        variant={props.activeFilter === "select4" ? "contained" : "outlined"}
                        size="small"
                        id="select4"
                        onClick={(e) => props.handleClick(e)}
                    >
                        {props.select4}
                    </Button>
                }
                <TextField
                    id="outlined-basic"
                    size="small"
                    label={props.placeholder}
                    variant="standard"
                    value={props.inputText}
                    onChange={(e) => {
                        props.setInputText(e.target.value);
                        props.filterName(e.target.value);
                    }}
                />
            </Box>
        </div>
    )
}

export default SearchBar