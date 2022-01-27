import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { PAGER_LIST } from "../Service/Constants";

const SelectBox = React.memo(({handleChange, size})  => {
    /**
     * For displaying PAGER 
     * 
     * All data came from Constants file.
     */
    return (
        <React.Fragment>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select value={size} onChange={handleChange} label="Size" >
                    {PAGER_LIST.map(item => ( <MenuItem value={item}>{item}</MenuItem> ))}
                </Select>
            </FormControl>
        </React.Fragment>
    );
});
export default SelectBox;