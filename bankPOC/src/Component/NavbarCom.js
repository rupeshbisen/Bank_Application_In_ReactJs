import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/First_page.css';
import { NavLink } from 'react-router-dom';
import { FcHome } from "react-icons/fc";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FcManager } from "react-icons/fc";
import { RiBankLine } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';


const NavbarCom = () => {
    const navLinkStyle = ({ isActive }) => {
        return {
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: isActive ? 'underline' : 'none'
        }
    }
    const navigate = useNavigate();
    const isLogin = localStorage.getItem("authToken") !== null;
    const islogOut =()=>{
        localStorage.removeItem("authToken");
        navigate("/LoginPage");
    }
    return (
        <div>

            <nav className="navbar navbar-expand-lg navStayle">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                           
                           { isLogin &&  <React.Fragment>
                                <li className="nav-item">
                                    <NavLink style={navLinkStyle} to='/'><FcHome /> <span>Home</span></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink style={navLinkStyle} to='/BankDetailes'><RiBankLine /> <span>BankDetailes</span></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink style={navLinkStyle} to='/CustomerDetailes'><FcManager /> <span>CustomerDetailes</span></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink style={navLinkStyle} to='/AccountOpening'><MdOutlineAccountCircle /> <span>AccountOpening</span></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink style={navLinkStyle} to='/MoneyTrans'><GiTakeMyMoney /> <span>MoneyTransaction</span></NavLink>
                                </li>
                            </React.Fragment>}
                            {!isLogin && 
                                <li className="nav-item">
                                    <NavLink style={navLinkStyle} to='/LoginPage'><button className='btn btn-primary LoginPage'><BiLogIn/> <span>LoginPage</span></button></NavLink>
                                </li>
                            }
                            {isLogin && 
                                <li className="nav-item">
                                <button className='btn btn-primary logout' onClick={islogOut}><BiLogOut/> <span >Logout</span></button>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

    );
}

export default NavbarCom;
