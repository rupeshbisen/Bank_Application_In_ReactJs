import React  from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavbarCom from './Component/NavbarCom';
import HomePage from './Component/HomePage';
import BankButton from "./Component/BankButton";
import CustomerDetailes from './Component/CustomerDetailes';
import BankDetailes from './Component/bankDetailes';
import AccountOpening from "./Component/AccountOpening";
import MoneyTrans from "./Component/MoneyTrans";
import 'react-toastify/dist/ReactToastify.css';
import Login from './Component/LoginPage';
function App() {
  return (
    <div>
          <NavbarCom/>
          <Routes>
            <Route  path='/LoginPage' element={<Login/>}/>
            <Route  path="/" element={<HomePage/>}/>
            <Route  path='/bankDetailes' element={<BankDetailes/> }/>
            <Route path='/CustomerDetailes'element={<CustomerDetailes/>}/>
            <Route path='/moneyTrans'element={<MoneyTrans/>}/>
            <Route path='/AccountOpening'element={<AccountOpening/>}/>
            <Route path='/BankButton'element={<BankButton/>}/>
          </Routes>
      {/* <NavbarCom />
      <CustomerDetailes/>
      
        
     moneyTrans  
     AccountOpening    */}
    </div>
  );
}

export default App;
