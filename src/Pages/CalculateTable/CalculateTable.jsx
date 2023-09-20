import { Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useState } from 'react';
import CustomizedTables from '../../Component/RahmanTrading';
import Axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { alertTitleClasses, Button } from '@mui/material';
import { fontFamily } from '@mui/system';
import { Link } from 'react-router-dom';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useEffect } from 'react';




const CalculateTable = () => {
const [Name, setName]=useState('')
const [Date, setDate]=useState('')
const [Purpose, setPurpose]=useState('')
const [Receipt, setReceipt]=useState('')
const [Payment, setPayment]=useState('')
// const [listOfInfo, setListOfInfo]=useState([]);
const [detailes, setDetailes]=useState([]);
// const [newName, setNewName]=useState('');
// const [newDetails, setNewDetails]=useState(detailes);


// useEffect(()=>{
// console.log('render is the object');
// }, [detailes])


React.useEffect(() => {
    Axios.get("http://localhost:5000/read").then((response) => {
      setDetailes(response.data);
    });
  }, []);



const handleClickAddToList=()=>{
     Axios.post("http://localhost:5000/insert", {
        Name,
        // Date:Date,
        Purpose,
        Receipt,
        Payment,
}).then((response)=>{
    setDetailes([...detailes, { Name,
        // Date:Date,
        Purpose,
        Receipt,
        Payment}, ])
     })
};



  const handleClickUpdate = (id) => {
    Axios.put("http://localhost:5000/update", {
      id: id,
      newName: 'Hasan',
      // newPrice: newPrice,
      // newQuantity: newQuantity,
    });
  };



const handleClickDelete=(detaile)=>{
  Axios.delete(`http://localhost:5000/delete/${detaile._id}`);
  // {
  //   detailes.map(detaile=>{
  //     const remainingDetailes=detailes.filter(detail=>detail._id !== detaile._id);
  //     setNewDetails(remainingDetailes);
  //   })
  // }
    // console.log(setNewDetails);
}

    return (
        <Box sx={{margin:2}}>
            <h1>Customer Table</h1>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                alignItems="center"
                                justifyContent={'center'}
                                margin='auto'
                                maxWidth={'full'}
                                boxShadow={'5px 5px 10px #ccc'}>
                                <TextField margin='normal' label="Name" type={'text'} onChange={e=>{setName(e.target.value)}}/>
                                {/* <TextField margin='normal' label="Date" type={'text'} onChange={e=>{setDate(e.target.value)}}/> */}
                                <TextField margin='normal' label="Purpose" type={'text'} onChange={e=>{setPurpose(e.target.value)}}/>
                                <TextField margin='normal' label="Receipt" type={'text'} onChange={e=>{setReceipt(e.target.value)}}/>
                                <TextField margin='normal' label="Payment" type={'text'} onChange={e=>{setPayment(e.target.value)}}/>
                                <Button onClick={() => handleClickAddToList()}>Add To Table</Button>
                            </Box>
                    </Grid>
                    <Grid item xs={8}>
                    <TableContainer component={Paper}>
      <Table sx={{ maxWidth:'full' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Purpose&nbsp;</TableCell>
            <TableCell align="right">Receipt&nbsp;</TableCell>
            <TableCell align="right">Payment&nbsp;</TableCell>
            {/* <TableCell align="right">Balance&nbsp;</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {detailes.map((detaile) => {
            return(
            // console.log('d');
            <TableRow
              key={detaile._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {detaile.name}
              </TableCell>
              <TableCell align="right">{detaile.date}</TableCell>
              <TableCell align="right">{detaile.purpose}</TableCell>
              <TableCell align="right">{detaile.receipt}</TableCell>
              <TableCell align="right">{detaile.payment}</TableCell>
              {/* <TableCell align="right">{row.Balance}</TableCell> */}

              {/* <Button onClick={handleClickUpdate(detaile._id)}><Link to={'/update'}  style={{ textDecoration: "none", color: '#0066FF' }}>Update</Link></Button> */}

              {/* <Link onClick={()=>handleClickUpdate(detaile._id)} ><ModeEditOutlineOutlinedIcon /></Link> */}
              <Button onClick={()=>handleClickUpdate(detaile._id)}>Update</Button><br/>
              <Button sx={{color:'red'}} onClick={()=>handleClickDelete(detaile)}>X</Button>
            </TableRow>
          ) })}
        </TableBody>
      </Table>
    </TableContainer>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default CalculateTable;