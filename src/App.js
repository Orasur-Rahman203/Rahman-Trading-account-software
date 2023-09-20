import { Tab, Table } from '@mui/material';
import './App.css';
import RahmanTrading from './Component/RahmanTrading';
import TechAnalytica from './Component/TechAnalytica';
import IndustrialSolution from './Component/IndustrialSolution';
import Header from './Component/Header';
import Company from './Component/Company';
import SignIn from './Component/SignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage/Homepage';
import Footer from './Pages/Footer/Footer.jsx';
// import Profile from './Component/Profile';
import CalculateTable from './Pages/CalculateTable/CalculateTable';
import { GlobalContext } from './Context/Context';
import React from 'react';
import { createTheme,colors , ThemeProvider } from '@mui/material';



const theme=createTheme({
  palette:{
    secondary:{
      main:colors.orange[500],
    },
    primary:{
      main:colors.blue[300],
    }
  }
})


function App() {
  const {user}=React.useContext(GlobalContext);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <BrowserRouter>
      {/* {
        user?.uid ? <Header />: ''
      } */}
        <Header />
        {/* <ScrollableTabsButtonAuto /> */}
        <Routes>
          <Route path='/' element={<Company/>} />
          <Route path='/signin' element={<SignIn />}/>
          {/* <Route path='/signup' element={<SignUp />}/> */}
          <Route path='/rahmanTrading' element={<RahmanTrading/>} />
          <Route path='/techAnalytica' element={<TechAnalytica/>} />
          <Route path='/industrialSolution' element={<IndustrialSolution/>} />
          <Route path='/company' element={<Company/>} />
          {/* <Route path='/profile' element={<Profile />} /> */}
          <Route path='/calculatetable' element={<CalculateTable />} />
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
      </ThemeProvider>
     </div>
  );
}

export default App;
