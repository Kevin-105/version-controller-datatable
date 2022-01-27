import React from 'react';

const DataInfo = React.memo(({from, to, totalData}) => {
    /**
     * Simple displaying information about current data & total data.
     */
    return (
        <React.Fragment>
            <div className="pager"> <span>Showing {from} to {to} records of {totalData}.</span> </div>
        </React.Fragment>
    );
});

export default DataInfo;