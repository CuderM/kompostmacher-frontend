import React, { useState } from 'react';
import TextInputWithValidation from './TextInputValidation';
import { useHistory } from 'react-router-dom';
import { userService } from '../services/userService';

import { toast } from 'react-toastify';

import '../style/Login.css';

const Signup = ({ setUserStatus }) => {
    let formValidationInfoDEMO = {
        'firstname': {
            valid: false,
            msg: ''
        },
        'lastname': {
            valid: false,
            msg: ''
        },
        'username': {
            valid: false,
            msg: ''
        },
        'form': {
            valid: false,
            msg: ''
        },
        'password': {
            valid: false,
            msg: ''
        }
    }

    const [formUser, setFormUser] = useState({
        'firstname': '',
        'lastname': '',
        'username': '',
        'password': ''
    });
    const [formValidationInfo, setFormValidationInfo] = useState(formValidationInfoDEMO);
    const history = useHistory();

    const submit = async e => {
        let user = formUser;
        user.admin = true;

        const token = userService.create(user)
            .then(data => {
                console.log(data)
                toast.success('User created');
                history.replace('/login');
            })
            .catch(err => {
                toast.error(err.message);
            }
            );
        
        console.log(token);
    }

    const onChange = (event) => {
        const { name, value } = event.target;
        setFormUser({ ...formUser, [name]: value });
        validateField(name, value);
    }

    const validateField = (name, value) => {
        let validationInfo;

        switch (name) {
            case 'firstname':
                validationInfo = checkFirstname(value);
                break;
            case 'lastname':
                validationInfo = checkLastname(value);
                break;
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

    function checkFirstname(value) {
        let msg = 'Firstname is okay';
        let valid = true;
        if (!value) {
            msg = 'provide a first name'
            valid = false;
        } else {
            // if (value.length < 4) {
            //     msg = 'first name is too short'
            //     valid = false;
            // }
        }
        return { valid, msg };
    }

    function checkPassword(value) {
        let msg = 'Password is okay';
        let valid = true;
        if (!value) {
            msg = 'provide a password'
            valid = false;
        } else {
            if (value.length < 6) {
                msg = 'password is too short'
                valid = false;
            }
        }
        return { valid, msg };
    }

    function checkLastname(value) {
        let msg = 'Last name is okay';
        let valid = true;
        if (!value) {
            msg = 'provide a last name name'
            valid = false;
        } else {
            // if (value.length < 4) {
            //     msg = 'last name is too short'
            //     valid = false;
            // }
        }
        return { valid, msg };
    }

    function checkUsername(value) {
        let msg = 'email is okay';
        let valid = true;
        if (!value) {
            msg = 'provide a email'
            valid = false;
        } else {
             if (value.length < 4) {
                msg = 'last name is too short'
                valid = false;
            }
        }
        return { valid, msg };
    }

    function checkForm(newFormValidationInfo) {
        let value = false;
        let msg = 'not ok';
        let validationInfo;

        if (newFormValidationInfo.firstname.valid && newFormValidationInfo.lastname.valid && newFormValidationInfo.username.valid) {
            value = true;
            msg = 'ok';
        }

        validationInfo = { value, msg };
        newFormValidationInfo['form'] = validationInfo

        return newFormValidationInfo;
    }

    function toLogIn() {
        history.replace('/login');
    }

    return (
        <div className="myform">
            <h1 className="formLabel">SIGN UP</h1>

            <div className="form-row">
                <div className="form-group col-md-6">
                    <TextInputWithValidation
                        formObject={formUser}
                        objectKey="firstname"
                        label="First Name"
                        placeholder="Firstname"
                        formValidationInfo={formValidationInfo}
                        onChange={onChange}
                    ></TextInputWithValidation>
                </div>
                <div className="form-group col-md-6">
                    <TextInputWithValidation
                        formObject={formUser}
                        objectKey="lastname"
                        label="Last Name"
                        placeholder="Lastname"
                        formValidationInfo={formValidationInfo}
                        onChange={onChange}
                    ></TextInputWithValidation>
                </div>
            </div>

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
                onChange={onChange}
                type="password"
            ></TextInputWithValidation>

            <button className="firstOption" disabled={!formValidationInfo["form"]?.value} onClick={() => submit()}>Sign Up</button>
            <p className="secondOption">Du hast noch schon einen Account? <button className="secondOption" onClick={() => toLogIn()}>Log in</button></p>
        </div>
    )
}



export default Signup;