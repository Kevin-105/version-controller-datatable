import React from 'react';

const DataInfo = React.memo(({from, to, totalData}) => {
    return (
        <React.Fragment>
            <div className="pager"> <span>Showing {from} to {to} records of {totalData}.</span> </div>
        </React.Fragment>
    );
});

export default DataInfo;