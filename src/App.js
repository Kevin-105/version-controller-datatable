import './App.css';
import React, { useEffect, useState } from 'react';

import { DEFAULT_PAGE_SIZE } from "./Service/Constants";
import { getVersions } from "./Service/Versions";
import SelectBox from './Components/SelectBox';
import VersionPagination from './Components/VersionPagination';
import DataInfo from './Components/DataInfo';
import SearchBox from './Components/SearchBox';
import VersionData from './Components/VersionData';

import Table from '@mui/material/Table';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';




import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

import { Loader } from "./Pages/loader";

const App = () => {

  const [versions, setVersions] = useState([]);
  const [selectedPage, setSelectedPage] = useState(0);
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setPackage] = useState({ keyword: '', size: DEFAULT_PAGE_SIZE, from: 0, pageCount: 1 });
  const [nowShowing, setNowShowing] = useState({ from: 1, to: DEFAULT_PAGE_SIZE });
  const [Headers, setHeaders] = useState([
    { Name: 'Package Name', isSorted: false, usedKey: 'name'}, 
    { Name: 'Version', isSorted: false, usedKey: 'version'}, 
    { Name: 'Date', isSorted: false, usedKey: 'date'}, 
    { Name: 'Github link', isSorted: false, usedKey: 'links.repository'}, 
    { Name: 'Keywords', isSorted: false, usedKey: 'keywords'}]);

  useEffect(() => { 
    getData(undefined, search.keyword, size, search.from); 
  }, []);

  const handleShowing = (SIZE, FROM) => {
    setNowShowing({...nowShowing, from: (FROM || 0) + 1, to: (FROM || 0) + (SIZE || DEFAULT_PAGE_SIZE) })
  };

  const getData = async function (e, KEYWORD, SIZE, FROM) {
    e?.preventDefault();
    try {
      setIsLoading(true)
      await getVersions({KEYWORD, SIZE, FROM}, (data) => {
        if(data.total > 0) {
          setVersions(data)
          setTotalData(data.total)
          setPackage({...search, pageCount: Math.ceil(data.total / SIZE)})
          handleShowing(SIZE, FROM);
        }
        setIsLoading(false)
      })
    } catch (error) {
      setIsLoading(false)
      return error;
    }
  };

  const changePage = (page, value) => { 
    setSelectedPage(value)
    setPackage({...search, from: (value - 1) * size }) 
    getData(undefined, search.keyword, size, (value - 1) * size);
  };
  
  const handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSize(value);
    setSelectedPage(0)
    setPackage({...search, from: 0 }) 
    getData(undefined, search.keyword, value, 0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPackage({...search, [name]: value})
  };

  const handleSorting = (e) => {
    /**
     * [ isSorted = false ] Means thrre is no sorting applied.
     */

    const NameComparator = (a, b) => {
      if(a !== undefined && b !== undefined)
      {
          let fa = a.package[e.usedKey]?.toLowerCase() || a.package[e.usedKey]?.toLowerCase(), fb = b.package[e.usedKey]?.toLowerCase() || b.package[e.usedKey]?.toLowerCase()

          if(e.isSorted) {
            if (fa < fb) return -1;
            if (fa > fb) return 1;
            return 0;
          }
          else {
            if (fa > fb) return -1;
            if (fa < fb) return 1;
            return 0;
          }
      }
    };

    setHeaders(Headers.map(H => { if(H.Name === e.Name) { H.isSorted= !e.isSorted } return H }))

    let AllVersionData = JSON.parse(JSON.stringify(versions))
    let Data = versions.objects.sort(NameComparator)
    AllVersionData.objects = Data
    setVersions(AllVersionData)

  };

  const clearSearch = () => {
    setPackage({...search, keyword: ''})
    getData(undefined, '', size, search.from); 
  }

  return (
   <React.Fragment>
     <Container fixed>
        <SearchBox size={size} from={search.from} keyword={search.keyword} handleSearch={handleSearch} getData={getData} clearSearch={clearSearch} />

        { isLoading ? <Loader /> : 
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead style={{cursor: 'pointer'}}> <TableRow> {Headers.map(item => ( <TableCell align="left">{item.Name} { item.isSorted ? <ArrowDownwardIcon onClick={() => handleSorting(item)} sx={{ fontSize: 15 }} /> : <ArrowUpwardIcon onClick={() => handleSorting(item)} sx={{ fontSize: 15 }} /> }</TableCell> ))} </TableRow> </TableHead>
              <VersionData versions={versions} />
            </Table>  
          </TableContainer> 
        }

        <div style={{justifyContent: 'space-between', display: 'flex', marginTop:"20px"}}>
          <SelectBox handleChange={handleChange} size={size} />
          <VersionPagination pageCount={search.pageCount} changePage={changePage} selectedPage={selectedPage} />
          <DataInfo from={nowShowing.from} to={nowShowing.to} totalData={totalData} />
        </div>

     </Container>
   </React.Fragment>
  );
};

export default App;
