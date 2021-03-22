import React, { useState} from 'react';
import WorkingPage from './WorkingPage';
import Admin from './Admin';
import Login from './Login';
import makeServerCall from '../components/callServer';

const Register = () => {
    const [active, setActive] = useState("Register");
    const [un, setUsername] = useState('');
    const [pw, setPassword] = useState('');
    const [fn, setFirstname] = useState('');
    const [ln, setLastname] = useState('');


    function reg() {
        fetch('http://service.kompostmacher:2604/api/v1/users/', {
            'method': 'POST'
        })

        /*makeServerCall('post', 'http://service.kompostmacher:2604/api/v1/users/', { 'username': un, 'password': pw, 'firstname': fn, 'lastname': ln}, 
        { 
            headers: [  
                        { 'authorization': {"username": "sokrates", "password": "dialog"} },
                        { 'Access-Control-Allow-Origin': ''}
                    ] 
        },
        response => {alert(response)},
        response => {alert(response.responseText)} 
        );*/
    }

    return (
        <div>
            {active === "Register" && 
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                    <div className="card-header">
                        <h3>Sign In</h3>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="username" onChange={event => setUsername(event.target.value)}/>
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="password" className="form-control" placeholder="password" onChange={event => setPassword(event.target.value)}/>
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="firstname" onChange={event => setFirstname(event.target.value)}/>
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="lastname" onChange={event => setLastname(event.target.value)}/>
                            </div>
                            <div className="row align-items-center remember">
                                <input type="checkbox"/>Remember Me
                            </div>
                            
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                            <div className="form-group">
                                <input type="submit" value="Login" className="btn float-right login_btn" onClick={() => {setActive("Login")}}/>
                            </div>
                            <div className="form-group">
                                Don't have an account?
                                <input type="submit" value="Sign Up" className="btn float-right login_btn" onClick={() => { reg(); setActive("Login");}}/>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                        <a href="#">Forgot your password?</a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            }
            { active === "WorkingPage" && <WorkingPage></WorkingPage>}
            { active === "Admin" && <Admin></Admin>}
            { active === "Login" && <Login></Login>}
        </div>
    )
}

export default Register;