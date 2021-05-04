import { useEffect, useState } from 'react';
import { userService } from '../services/userService';
import TextInputWithValidation from './TextInputValidation';
import { useHistory, useRouteMatch, useParams} from 'react-router-dom';
import'bootstrap-icons/font/bootstrap-icons.css'; 

export default function SimpleForm () {
    let matchUrl = useRouteMatch();
    console.log(matchUrl);

    let { userId } = useParams();
    console.log(userId);

    const FormMode = { NOT_FOUND:0, NEW:1, UPDATE:2,     }; 
    const [formMode, setFormMode] = useState(FormMode.NOT_FOUND);
    const [formUser, setFormUser] = useState({}); 

    function createFormValidInfo(valid) {
        return {
            'firstname': {
                valid: valid,
                msg: ''
            },
            'lastname': {
                valid: valid,
                msg: ''
            },
            'username': {
                valid: valid,
                msg: ''
            },
            'password': {
                valid: valid,
                msg: ''
            },
            'form': {
                valid: valid,
                msg: ''
            }
        }
    }

    const [formValidationInfo, setFormValidationInfo] = useState(createFormValidInfo(true));
    const history = useHistory();

    useEffect(() => {
        let componentIsMounted = true;

        if(userId.toLowerCase() === 'new') {
            setFormMode(FormMode.NEW);
            setFormValidationInfo(createFormValidInfo(false));
        } else {
            userService.getById(userId)
                .then(u => {
                    if(componentIsMounted) {
                        setFormUser(u);
                        setFormMode(FormMode.UPDATE);
                    }
                })
                .catch(err => {
                    if(componentIsMounted) 
                        setFormMode(FormMode.NOT_FOUND);
                    console.log(err)
                });
        }
    }, [FormMode.NEW, FormMode.NOT_FOUND, FormMode.UPDATE, userId]);

    function checkFirstname(fn) {
        let msg = 'ok';
        let valid = true;
        return { valid, msg };
    }

    function checkLastname(fn) {
        let msg = 'ok';
        let valid = true;

        if(!fn)  {
            msg = 'last name is not allowed to be empty';
            valid = false;
        }

        return { valid, msg };
    }

    function checkUsername(fn) {
        let msg = 'ok';
        let valid = true;

        if(!fn)  {
            msg = 'username is not allowed to be empty';
            valid = false;
        } else {
            if(fn.length < 4) {
                msg = 'first name is too short';
                valid = false;
            } else if(fn.length > 20) {
                msg = 'first name is too long';
                valid = false;
            }
        }
        return { valid, msg };
    }

    function checkPassword(g, name) {
        let msg = 'ok';
        let valid = true;

        if(g.length < 6) {
            msg = 'first name is too short';
            valid = false;
        }

        return { valid, msg };
    }

    const validateField = (name, value) => {
        let validationInfo;

        switch(name) {
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
                validationInfo = checkPassword(value, name);
                break;
            default:
        }

        let newFormValidationInfo = {
            ...formValidationInfo,
            [name]: validationInfo
        }

        let formValid = true;

        Object.entries(newFormValidationInfo).map(prop => {
            if(!prop[1].valid)
            {
                formValid = false;
            }
            return {}
        })

        newFormValidationInfo.form = {
            valid: formValid,
            msg: ''
        }

        setFormValidationInfo(newFormValidationInfo);
    }

    const onChange = (event) => {
        const { name, value } = event.target;
        setFormUser({...formUser, [name]: value });
        validateField(name, value);
    }

    const submitForm = (create) => { 
        if(create) {
            userService.create(formUser)
                .then(() => history.push('/admin'))
        } else {
            userService.update(userId, formUser)
                .then(() => history.push('/admin'))
        }
    } 

    return [
        <form className="form-border">
            <div className="form-row">
                <div className="col">
                    <TextInputWithValidation
                        formObject={formUser}
                        objectKey="username"
                        label="User name"
                        placeholder="Username"
                        formValidationInfo={formValidationInfo}
                        onChange={onChange}
                    ></TextInputWithValidation>
                </div>
                <div className="col">
                    <TextInputWithValidation
                        formObject={formUser}
                        objectKey="firstname"
                        label="First name"
                        placeholder="Firstname"
                        formValidationInfo={formValidationInfo}
                        onChange={onChange}
                    ></TextInputWithValidation>
                </div>
                <div className="col">
                    <TextInputWithValidation
                        formObject={formUser}
                        objectKey="lastname"
                        label="Last name"
                        placeholder="Lastname"
                        formValidationInfo={formValidationInfo}
                        onChange={onChange}
                    ></TextInputWithValidation>
                </div>
            </div>
            <br/>
            <div className="form-row">
                <div className="col">
                    <TextInputWithValidation
                        formObject={formUser}
                        objectKey="password"
                        label="Password"
                        type="password"
                        placeholder="******"
                        formValidationInfo={formValidationInfo}
                        onChange={onChange}
                    ></TextInputWithValidation>
                </div>
            </div>
            <br/>
            {
                formMode === 1 && 
                <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => { submitForm(true) }}
                disabled={!formValidationInfo["form"]?.valid}>
                Create
                </button>
            }
            {
                formMode !== 1 && 
                <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => { submitForm(false) }}
                    disabled={!formValidationInfo["form"]?.valid}>
                    Submit
                </button>
            }
        </form>
    ]
}