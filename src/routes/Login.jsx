import React, { useState} from 'react';
import WorkingPage from './WorkingPage';
import Admin from './Admin';
import Register from './Register';

function Login() {
    const [active, setActive] = useState("Login");

    return (
        <div>
            {active === "Login" && 
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
                            <input type="text" className="form-control" placeholder="username"/>
                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                            </div>
                            <input type="password" className="form-control" placeholder="password"/>
                        </div>
                        <div className="row align-items-center remember">
                            <input type="checkbox"/>Remember Me
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Login" className="btn float-right login_btn" onClick={() => {setActive("WorkingPage")}}/>
                        </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                            <div className="form-group">
                                Don't have an account?
                                <input type="submit" value="Sign Up" className="btn float-right login_btn" onClick={() => {setActive("Register")}}/>
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
            { active === "Register" && <Register></Register>}
        </div>
    )
}

export default Login;