import React, { useState, useContext } from 'react';
import TextInputWithValidation from './TextInputValidation';

import '../style/Login.css';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../services/AuthContext';
import { authService } from '../services/authService';

const Login = (props) => {
    const ctx = useContext(AuthContext);
    console.log(ctx)
    const history = useHistory();

    let formValidationInfoDEMO = {
        'username': {
            valid: true,
            msg: ''
        },
        'form': {
            valid: true,
            msg: ''
        },
        'password': {
            valid: true,
            msg: ''
        }
    }

    const [formUser, setFormUser] = useState({
        'username': 'Poizen159',
        'password': '123123',
        'type': 'session'
    });

    const [formValidationInfo, setFormValidationInfo] = useState(formValidationInfoDEMO);

    const submit = async () => {
        let user = formUser;
        // login
        //     .then(data => { 
        //         console.log(data);
        //         localStorage.setItem('id', data.user._id)
        //         localStorage.setItem('isAdmin', data.user.admin)
        //         history.push('/workingpage');
        //     })
        //     .catch(err => {
        //         toast.error(err.message + ': Wrong email or password');
        //     })
        ctx.login(user)
            .then(data => { 
                console.log(data);
                localStorage.setItem('id', data.user._id)
                localStorage.setItem('isAdmin', data.user.admin)
                history.push('/workingpage');
            })
            .catch(err => {
                console.log(err)
                toast.error(err.message + ': Wrong email or password');
            }
        );
    }

    function toSignUp() {
        history.replace('/signup');
    }

    const onChange = (event) => {
        const { name, value } = event.target;
        setFormUser({ ...formUser, [name]: value });
        validateField(name, value);
    }

    const onKLIChange = (event) => {
        const { name, value } = event.target;
        let nVal;
        value ? nVal = 'local' : nVal = 'session'
        setFormUser({ ...formUser, [name]: nVal });
    }

    const validateField = (name, value) => {
        let validationInfo;

        switch (name) {
            case 'username':
                validationInfo = checkUsername(value);
                break;
            case 'password':
                validationInfo = checkPassword(value);
                break;
            default:
        }

        let newFormValidationInfo = {
            ...formValidationInfo,
            [name]: validationInfo
        };

        newFormValidationInfo = checkForm(newFormValidationInfo);
        setFormValidationInfo(newFormValidationInfo);
    }

    function checkPassword(value) {
        let msg = '';
        let valid = true;
        if (!value) {
            msg = 'provide a password'
            valid = false;
        }
        return { valid, msg };
    }

    function checkUsername(value) {
        let msg = 'username is okay';
        let valid = true;
        if (!value) {
            msg = 'provide a email'
            valid = false;
        } else {
            //further validation
        }
        return { valid, msg };
    }

    function checkForm(newFormValidationInfo) {
        let value = false;
        let msg = 'not ok';
        let validationInfo;

        if (newFormValidationInfo.username.valid && newFormValidationInfo.password.valid) {
            value = true;
            msg = 'ok';
        }

        validationInfo = { value, msg };
        newFormValidationInfo['form'] = validationInfo

        return newFormValidationInfo;
    }

    return (
        <div className="myform">

            <h1 className="formLabel">LOG IN</h1>

            <TextInputWithValidation
                formObject={formUser}
                objectKey="username"
                label="Username"
                placeholder="Username"
                formValidationInfo={formValidationInfo}
                onChange={onChange}
            ></TextInputWithValidation>

            <TextInputWithValidation
                formObject={formUser}
                objectKey="password"
                label="Password"
                placeholder="password"
                formValidationInfo={formValidationInfo}
                type="password"
                onChange={onChange}
            ></TextInputWithValidation>

            <button className="firstOption" disabled={!formValidationInfo["form"]?.value} onClick={() => submit()}>LOG IN</button>
            <p className="secondOption">Angemeldet bleiben? <input name="type" type="checkbox" onClick={onKLIChange}></input></p>
            
            <p className="secondOption">Du hast noch keinen Account? <button className="secondOption" onClick={() => toSignUp()}>SIGN UP</button></p>
        </div>
    )
}

export default Login;