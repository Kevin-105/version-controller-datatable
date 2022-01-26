import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SearchBox = React.memo(({keyword, handleSearch, getData, size, from }) => {
    return (
        <React.Fragment>
            <form onSubmit={(e) => getData(e, keyword, size, from)}>
                <TextField sx={{ width: 500, maxWidth: '100%' }} label="Search Package" variant="outlined" size="small" name='keyword' value={keyword} onChange={(e) => handleSearch(e)} />
                <Button style={{margin:"0 20px"}} variant="contained">Search</Button>
                <Button variant="text">Clear</Button>
            </form>
        </React.Fragment>
    );
});

export default SearchBox;