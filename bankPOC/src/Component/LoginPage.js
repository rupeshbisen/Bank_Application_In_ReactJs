import React,{useState} from 'react';
import '../Component/css/loginPage.css'
import Api from '../utils/Api';
import Notification from '../utils/Notification';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const onLogin = (e) => {
        e.preventDefault();
        let loginData={ username ,   password  }
        Api.login(loginData).then(response=>{
            Notification.notifySuccess("Login succesfull");
            navigate("/");
        }).catch(reson => {
            if (reson.response.status === 400) {
                Notification.notifyError(reson.response.data.message);
              
            }
            Notification.notifyError("Some error occure !!");
        })
    }
    
    return (
        <div className="Auth-form-container">
            <form onSubmit={(e) => onLogin(e)} className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            value={username} onChange={(e) => setUserName(e.target.value)}
                            className="form-control mt-1"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            className="form-control mt-1"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    {/* <p className="forgot-password text-right mt-2">
                        Forgot <a href="#">password?</a>
                    </p> */}
                </div>
            </form>
            <ToastContainer/>
        </div>
    )
}

