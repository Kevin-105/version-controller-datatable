import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectBox = React.memo(({handleChange, size})  => {
    return (
        <React.Fragment>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={size} onChange={handleChange} label="Age" >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={250}>250</MenuItem>
                </Select>
            </FormControl>
        </React.Fragment>
    );
});
export default SelectBox;