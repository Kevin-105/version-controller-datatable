import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const VersionPagination = React.memo(({pageCount, changePage, selectedPage}) => {
    /**
     * This components are displaying pagination.
     */
    return (
        <Stack spacing={2}>
            <Pagination count={pageCount} page={selectedPage || 1} onChange={changePage} />
        </Stack>
    );
});

export default VersionPagination;