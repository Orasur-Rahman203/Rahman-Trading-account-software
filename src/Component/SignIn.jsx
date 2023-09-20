import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import GoogleIcon from '@mui/icons-material/Google';
// import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../Context/Context';
import swal from 'sweetalert';
import { GoogleAuthProvider } from 'firebase/auth';
import {Form}  from 'antd'; 

const SignIn = () => {
  const {LogIn}=useContext(GlobalContext);
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [userError, setUserError]=useState('');
  const navigate= useNavigate();
  // const [form]=Form.useForm();


const handleClicked=(e)=>{
  // console.log(email, password, "email najjsljflak");
e.preventDefault();
LogIn(email, password)
.then(result => {
  const user = result.user;
  console.log("username ----- ",user);
  if(user.emailVerified || user.email === "razialim73@gmail.com"){
    navigate('/rahmanTrading')
    swal("Successfully LogIn!", "You clicked the button!", "success");
    }
})
.catch(error => {
  console.error(error);
  swal(`${error.message}`, "You clicked the button!", "error");
  // swal("Something Is Wrong!", "You clicked the button!", "warning");
})
  }

  return (
    <Box sx={{mt:5}}>
        <Typography variant='h6'>RAHMAN TRADING</Typography>
    <Typography variant='h6'>TECH  ANALYTICA  LIMITED</Typography>
    <Typography variant='h6'>INDUSTRIAL SOLUTION BD</Typography>
    <form>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems="center"
        justifyContent={'center'}
        margin='auto'
        maxWidth={400}
        marginTop={5}
        padding={3}
        borderRadius={5}
        boxShadow={'5px 5px 10px #ccc'}
        sx={{
          ":hover": {
            boxShadow: '10px 10px 20px #ccc'
          }
        }}
      >
        <Box
          sx={{ borderRadius: 6, padding: 1 }}
        >
          <LoginIcon style={{ color: '#fff' }} />
        </Box>
        <Typography variant='h3' padding={2} textAlign="center">Sign In</Typography>
        <Typography padding={2} textAlign="center">SIGN IN WITH<br/> EMAIL</Typography>
        <TextField sx={{ width: 260 }} margin='normal' label="Email" name='email' type={'text'} onChange={(e) => setEmail((e.target.value))}/>
        <TextField sx={{ width: 260 , color:"primary.main" }} margin='normal' label="Password" name='password' type={'password'} variant='outlined' onChange={(e) => setPassword((e.target.value))}/>
        <Button variant='contained' sx={{ width: 260, padding: 1, margin: 1 , bgcolor:"#23699A"}} type="submit" onClick={handleClicked}>Sign In</Button>
      </Box>
    </form>
    
    <Typography sx={{marginTop:5,
    // textAlign:'start',
    m:2
    }} ><b>Address :</b>Progress Tower, 4th floor, House #01, Road #23, Gulshan 1, Dhaka 1212 </Typography>
    </Box>
  );
};

export default SignIn;