import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { CardMedia } from '@mui/material';
import logo from '../../Assets/RT.svg'
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
// import DatePicker from "react-datepicker";


const Footer = () => {
  const today = Date.now();

console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today));


{/* <DatePicker
  selected={date}
  onSelect={handleDateSelect} //when day is clicked
  onChange={handleDateChange} //only when value has changed
/> */}


    return (
    <Box  sx={{mt:4, width:'full', bgcolor:"primary.dark"}}>
    <Box sx={{ flexGrow: 1 , mx:10}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
        <Typography
            // variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              paddingTop:'4rem',
              width: '100%',
               height: 100,
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
                <CardMedia
              sx={{padding:2,
                height:"140",
                width:'200'
              }}
              component="img"
              image={logo}
              alt="rahman trading logo"
            />
           {/* <img sx={{width:30, height:20}} src={logo} alt='logo'/> */}
          </Typography>
        {/* <CardMedia
                sx={{padding:2}}
              component="img"
              width={50}
              // height="100"
              image={logo}
              alt="Rahman trading"
            /> */}
            {/* <image src={logo} alt="rahman trading" /> */}
        </Grid>
        <Grid item xs={12} sm={4}>
        <h4>PROFILE</h4>
        </Grid>
        <Grid item xs={12} sm={4}>
        <h4>PRODUCT</h4>
        </Grid>
      </Grid>
      <Box sx={{padding:3}}>
        Powered By<strong><span> <Link to={'https://www.techanalyticaltd.com'} target={'_blank'}><Typography sx={{underline:'hover'}}>Tech Analytica Limited ®</Typography></Link></span></strong>2023 || Version 1.0
      </Box>
    </Box>
    </Box >
    );
};

export default Footer;