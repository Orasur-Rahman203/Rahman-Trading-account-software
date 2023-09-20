import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
// import { Link } from '@mui/material';
import Link from '@mui/material/Link';
import {useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Context/Context';
import swal from 'sweetalert';
import logo from '../Assets/RT.svg'
import { CardMedia } from '@mui/material';


// const pages = ['Rahman Trading', 'Eshlon', 'ETC'];
// const settings = ['Sign Up', 'Sign In', 'Sign Out', 'Profile'];

const Header = () => {
  const {user,LogOutAll, LogIn}=React.useContext(GlobalContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate= useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

const handleHeaderRT=()=>{
  {
    user?.uid  ?
    navigate('/rahmanTrading') :
    navigate('/signin') 
  }
}
const handleHeaderTAL=()=>{
  {
    user?.uid  ?
    navigate('/techAnalytica') :
    navigate('/signin') 
  }
}
const handleHeaderIDL=()=>{
  {
    user?.uid  ?
    navigate('/industrialSolution') :
    navigate('/signin') 
  }
}

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickedLogout=()=>{
    LogOutAll()
    .then(() => {navigate('/') })
    swal("Successfully LogOut!", "You clicked the button!", "success");
  }
//  const handleClickedLogin=()=>{
//   LogIn(email, password)
//  }
// console.log(user?.uid);
  return (
    <AppBar position="sticky" sx={{bgcolor:'primary.dark'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            // boxShadow={'5px 5px 10px #ccc'}
            sx={{
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
              sx={{padding:2}}
              component="img"
              height="80"
              image={logo}
              alt="Paella dish"
            />
           {/* <img sx={{width:30, height:20}} src={logo} alt='logo'/> */}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" onClick={handleHeaderRT}>Rahman Trading</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" onClick={handleHeaderTAL}>Tech Analytica Ltd</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" onClick={handleHeaderIDL}>Industrial Solutions BD</Typography>
              </MenuItem>
              {/* <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Industrial Solutions BD</Typography>
              </MenuItem> */}
              {/* <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Echelon Epc Ltd</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Rahman Agro Food</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Vera Mount Ltd</Typography>
              </MenuItem> */}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              // mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          <img src={logo} alt="logo" width="200" height='160' />
          </Typography>
              {/* <Typography
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 0,
              display: { xs: "flex", lg: "none" },
              fontSize: "1.3rem",
              flexGrow: 1,
              color: "inherit",
              textDecoration: "none",
            }}
          > <img src={logo} alt="logo" width="30" />
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}

            <Button onClick={handleCloseNavMenu} sx={{ my: 2, display: 'block' }}>
            {/* <Link to={'/customizedTable'}>
              Rahman Trading
            </Link> */}
            <Link onClick={handleHeaderRT} sx={{ textDecoration:'none'}}><Typography sx={{color:'white'}}>Rahman Trading</Typography></Link>
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, display: 'block' }}>
              {/* <Link to={'/customTable'}>
            Tech Analytica Ltd
            </Link> */}
            <Link onClick={handleHeaderTAL} sx={{ textDecoration:'none'}}><Typography sx={{color:'white'}}>Tech Analytica Ltd</Typography></Link>
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, display: 'block' }}>
              {/* <Link to={'/customTable'}>
            Tech Analytica Ltd
            </Link> */}
            <Link onClick={handleHeaderIDL} sx={{ textDecoration:'none'}}><Typography sx={{color:'white'}}>Industrial Solutions BD</Typography></Link>
            </Button>
            {/* <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
            Industrial Solutions BD
            </Button> */}
            {/* <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
            Echelon Epc Ltd
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
            Rahman Agro Food
            </Button>
         <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
            Vera Mount Ltd
            </Button> */}

            {/* <Link
        to={"/about"}
        style={{ textDecoration: "none" }}
      >
        <Typography
          variant="h6"
          sx={{ cursor: "pointer" }}
          aria-controls="simple-menu" aria-haspopup="true" onClick={handleCloseNavMenu}
        >
          About Us
        </Typography>
      </Link> */}

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))} */}

{
  user?.uid ?  <MenuItem onClick={handleCloseUserMenu}>
  <Link style={{ textDecoration: "none", color: 'inherit' }} to='/signin' onClick={handleClickedLogout}>
    <Typography textAlign="center"> Sign Out</Typography>
  </Link>
</MenuItem>
: <>
{/* <MenuItem onClick={handleCloseUserMenu}>
                <Link style={{ textDecoration: "none", color: 'inherit' }} to='/signup'>
                  <Typography textAlign="center">Sign Up</Typography>
                </Link>
              </MenuItem> */}
              <MenuItem onClick={handleCloseUserMenu}>
                <Link style={{ textDecoration: "none", color: 'inherit' }} href="/signin">
                  <Typography textAlign="center">Sign In</Typography>
                </Link>
              </MenuItem>
</>
}


              {/* <MenuItem onClick={handleCloseUserMenu}>
                <Link style={{ textDecoration: "none", color: 'inherit' }} to='/signup'>
                  <Typography textAlign="center">Sign Up</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link style={{ textDecoration: "none", color: 'inherit' }} to='/signin'>
                  <Typography textAlign="center">Sign In</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link style={{ textDecoration: "none", color: 'inherit' }} to='/' onClick={handleClickedLogout}>
                  <Typography textAlign="center"> Sign Out</Typography>
                </Link>
              </MenuItem> */}
              {/* <MenuItem onClick={handleCloseUserMenu}>
                <Link style={{ textDecoration: "none", color: 'inherit' }} to='/profile'>
                  <Typography textAlign="center">Profile</Typography>
                </Link>
              </MenuItem> */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
