import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectBox = React.memo(({handleChange, size})  => {
    let LIST = [10, 50, 100, 250];
    return (
        <React.Fragment>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select value={size} onChange={handleChange} label="Size" >
                    {LIST.map(item => ( <MenuItem value={item}>{item}</MenuItem> ))}
                </Select>
            </FormControl>
        </React.Fragment>
    );
});
export default SelectBox;