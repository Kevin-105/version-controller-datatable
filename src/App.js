import './App.css';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import moment from "moment";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from "axios";

const App = () => {

  const [versions, setVersions] = useState([]);
  const [search, setPackage] = useState('');
  const [pageCount, setPageCount] = useState('');  
  const [currentPage, setCurrentPage] = useState(0);


  useEffect(() => {
    getData();
  }, [])

  const getCurrentPage = (pageCount, currentPage) => {
    currentPage+=1
    return currentPage <= pageCount ? currentPage-=1 : 0
  }

  const changePage = (page, notSteady) => { setCurrentPage(page) };

  const getData = async function () {
    try {
      let {data} = await axios.get(`https://registry.npmjs.org/-/v1/search?text=${search || 'react-table'}`);
      setVersions(data)
      setPackage('')
    } catch (error) {
      return error;
    }
  };

  return (
   <React.Fragment>
     <input type='text' onChange={(e) => setPackage(e.target.value)}/><button onClick={getData}>Search</button>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Package Name</TableCell>
            <TableCell align="right">Version</TableCell>
            <TableCell align="right">Date (show in 24th jan 2020 format)</TableCell>
            <TableCell align="right">Github link</TableCell>
            <TableCell align="right">Keywords</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {versions.objects && versions.objects.length > 0 && versions.objects.map((row) => (
            <TableRow key={row.package.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row">{row.package.name}</TableCell>
              <TableCell align="right">{row.package.version}</TableCell>
              <TableCell align="right">{row.package.date}</TableCell>
              <TableCell align="right"><a href={row.package.links.repository} target="_blank">{row.package.links.repository}</a></TableCell>
              <TableCell align="right">{row.package.keywords?.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={changePage}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        forcePage={0}
      />

    </TableContainer>
   </React.Fragment>
  );
};

export default App;
