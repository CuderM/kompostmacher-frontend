import { useEffect, useState } from 'react';
import TextInputWithValidation from './TextInputValidation';
import { useHistory, useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import'bootstrap-icons/font/bootstrap-icons.css'; 

import { useLocation } from 'react-router-dom';

export default function Form () {
    const location = useLocation();
    const {createFormValidInfo, getEntityById, entityCreate, entityUpdate, checkFields, entity} = location;

    let { id } = useParams();

    const FormMode = { NOT_FOUND:0, NEW:1, UPDATE:2,     }; 
    const [formMode, setFormMode] = useState(FormMode.NOT_FOUND);
    const [formEntity, setFormEntity] = useState({}); 

    const [formValidationInfo, setFormValidationInfo] = useState(createFormValidInfo(true));
    const history = useHistory();

    function getExmplEntity() {
        let ent;

        switch(entity) {
            case 'Benutzer':
                ent = {
                    firstname: '',
                    lastname: '',
                    username: '',
                    password: ''
                }
                break;
            case 'Produkte':
                ent = {
                    name: '',
                    einheit: '',
                    spezifikation: '',
                    schluesselnummer: ''
                }
                break;
            case 'Kunden':
                ent = {
                    name: '',
                    adresse: '',
                    anschrift: '',
                    email: ''
                }
                break;
            default:
        }

        return ent;
    }

    useEffect(() => {
        let componentIsMounted = true;

        if(id.toLowerCase() === 'new') {
            setFormMode(FormMode.NEW);
            setFormValidationInfo(createFormValidInfo(false));
            setFormEntity(getExmplEntity());
        } else {
            getEntityById(id)
                .then(u => {
                    if(componentIsMounted) {
                        setFormEntity(u);
                        setFormMode(FormMode.UPDATE);
                    }
                })
                .catch(err => {
                    if(componentIsMounted) 
                        setFormMode(FormMode.NOT_FOUND);
                    console.log(err)
                });
        }
    }, [FormMode.NEW, FormMode.NOT_FOUND, FormMode.UPDATE, id, getEntityById, createFormValidInfo]);

    const validateField = (name, value) => {
        
        let newFormValidationInfo = checkFields(name, value, formValidationInfo)

        let formValid = true;

        Object.entries(newFormValidationInfo).map(prop => {
            if(!prop[1].valid && prop[0] !== 'form')
            {
                formValid = false;
            }
            return ''
        })

        newFormValidationInfo.form = {
            valid: formValid,
            msg: ''
        }

        setFormValidationInfo(newFormValidationInfo);
    }

    const onChange = (event) => {
        const { name, value } = event.target;
        setFormEntity({...formEntity, [name]: value });
        validateField(name, value);
    }

    const submitForm = (create) => { 
        formEntity.userId = localStorage.getItem('id');
        if(create) {
            entityCreate(formEntity)
                .then(() => history.push('/admin'))
                .catch(err => toast.error(err));
        } else {
            entityUpdate(id, formEntity)
                .then(() => history.push('/admin'))
                .catch(err => toast.error(err));
        }
    } 

    return [
        <form className="form-border">
            <div className="form-row">
                {
                    Object.keys(formEntity).map(attr => {
                        if(attr === '_id' || attr === 'admin' || attr === 'userId')  return ''
                        return <div className="col">
                            <TextInputWithValidation
                                formObject={formEntity}
                                objectKey={attr}
                                label={attr}
                                placeholder={attr}
                                type={attr === 'password' ? 'password' : 'text'}
                                formValidationInfo={formValidationInfo}
                                onChange={onChange}
                            ></TextInputWithValidation>
                        </div>
                    })
                }
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