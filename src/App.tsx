import './App.css';
import {Route, Routes} from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { UserPage } from './pages/UserPage';
import { Header } from './components/Header';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AuctionPage } from './pages/AuctionPage';
import { AddAuctionPage } from './pages/AddAuctionPage';
import LotComponent from './components/LotComponent';
import { TermsOfUsePage } from './pages/TertsOfUsePage';

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={ <MainPage/> } />
        <Route path='/user/:userId' element={ <UserPage/> } />
        <Route path='/login' element={ <LoginPage/> } />
        <Route path='/register' element={ <RegisterPage/> } />
        <Route path='/auction/:auctionName' element={ <AuctionPage/> } />
        <Route path='/addAuction' element={ <AddAuctionPage/> } />
        <Route path='/lotComponent' element={ <LotComponent/> } />
        <Route path='/TermsOfUse' element={ <TermsOfUsePage/> } />
      </Routes>
    </>
  );
}

export default App;


