import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const VersionPagination = React.memo(({pageCount, changePage, selectedPage}) => {
    return (
        <Stack spacing={2}>
            <Pagination count={pageCount} page={selectedPage} onChange={changePage} />
        </Stack>
    );
});

export default VersionPagination;