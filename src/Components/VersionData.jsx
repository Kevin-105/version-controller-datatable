import React from 'react';
import moment from "moment";
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const VersionData = React.memo(({versions}) => {
  /**
   * All data are displaying in componant.
   * So, our main page looks clear.
   */
    return (
        <TableBody>
          {versions.objects && versions.objects.length > 0 && versions.objects.map((row) => (
            <TableRow key={row.package.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell style={{width:"180px"}} component="th" scope="row">{row.package.name}</TableCell>
              <TableCell style={{width:"100px"}} align="left">{row.package.version}</TableCell>
              <TableCell style={{width:"100px"}} align="left">{moment(row.package.date).format('Do MMM YYYY')}</TableCell>
              <TableCell style={{width:"320px"}} align="left"><a href={row.package.links.repository} target="_blank">{row.package.links.repository}</a></TableCell>
              <TableCell align="left">{row.package.keywords?.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
    );
});

export default VersionData;