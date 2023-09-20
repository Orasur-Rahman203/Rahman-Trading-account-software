import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TAL from '../Assets/TAL.svg'
import RT from '../Assets/RT.svg'
import IS from '../Assets/ISB.svg'
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import { GlobalContext } from '../Context/Context';
import swal from 'sweetalert';
import { useNavigate } from 'react-router';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  // const [expanded, setExpanded] = React.useState(false);
  const { user } = React.useContext(GlobalContext);
  const navigate = useNavigate()
// console.log(user.emailVerified);
  // const handleClickedLogout = () => {
  //   LogOutAll()
  //     .then(() => { navigate('/') })
  //   swal("Successfully LogOut!", "You clicked the button!", "success");
  //   // navigate('/signin')
  //   // navigate('/')
  // }

  const handleClickedRT = () => {
    // console.log(user?.uid);
    {
      user?.uid  ?
      navigate('/rahmanTrading') :
      navigate('/signin') 
    }
  };
  const handleClickedTAL = () => {
    // console.log(user?.uid);
    {
      user?.uid  ?
      navigate('/techAnalytica') :
      navigate('/signin') 
    }
  };
  const handleClickedISB = () => {
    {
      user?.uid  ?
      navigate('/industrialSolution') :
      navigate('/signin') 
    }
    // navigate('/customizedTable')
  };
  // const handleClickedCOM = () => {
  //   console.log('Com');
  //   navigate('/customizedTable')
  // };

  return (
    <Box sx={{ flexGrow: 1 , m:2}}>

      {/* <Button sx={{ width: 240, margin: 4, bgcolor: "#23699A" }} variant="contained" onClick={handleClickedLogout}>Sign Out</Button> */}


      <Grid container spacing={2} justify="center">

        <Grid item xs={12} sm={4} align='center'>
          <Card sx={{ maxWidth: 345, height: 260 , paddingTop:3, bgcolor:'primary.light', cursor: 'pointer'}} onClick={() => handleClickedRT()}>
            <CardMedia
            sx={{width:250, height:140}}
              component="img"
              height="full"
              image={RT}
              alt="Paella dish"
            />
            <CardContent sx={{ textAlign: 'center' }} >
              {/* <Button sx={{ bgcolor: "#23699A" }} variant="contained" >See More</Button> */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} align='center' >
          <Card sx={{ maxWidth: 345, height: 240 , paddingTop:6 , bgcolor:'primary.light', cursor: 'pointer'}} onClick={() => handleClickedTAL()}>
            <CardMedia
              component="img"
              height="full"
              image={TAL}
              alt="Paella dish"
            />
            <CardContent sx={{ textAlign: 'center' }}>
              {/* <Button sx={{ bgcolor: "#23699A" }} variant="contained" >See More</Button> */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} align='center'>
          <Card sx={{ maxWidth: 345, height: 260 , paddingTop:3, bgcolor:'primary.light',cursor: 'pointer'}} onClick={() => handleClickedISB()}>
            <CardMedia
              component="img"
              height="full"
              image={IS}
              alt="Paella dish"
            />
            <CardContent sx={{ textAlign: 'center' }}>
              {/* <Button sx={{ bgcolor: "#23699A" }} variant="contained" >See More</Button> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* <Button sx={{ width: 340,height:140, margin: 2, bgcolor: "primary.light", fontSize:30 }} variant="contained" onClick={handleClickedCOM}>COMBINED <br/> ALL COMPANY</Button> */}
    </Box>
  );
}