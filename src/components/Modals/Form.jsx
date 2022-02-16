import { useEffect, useState } from 'react';
import TextInputWithValidation from '../Utils/TextInputValidation';
import'bootstrap-icons/font/bootstrap-icons.css'; 


export default function Form ({closeModal, entity, entityType}) {
    const [currEntity, setCurrEntity] = useState(entity)
    const [updateOrCreate, setUpdateOrCreate] = useState('bearbeiten')

    const formValidationInfoDEMO = {
        form: {
          valid: true,
          msg: "",
        },
      };
    
      const formValidationInfoUserCorr = {
        firstname: {
          valid: true,
          msg: "",
        },
        lastname: {
          valid: true,
          msg: "",
        },
        username: {
          valid: true,
          msg: "",
        },
        password: {
            valid: true,
            msg: "",
          },
        form: {
          valid: true,
          msg: "",
        },
      };
      const formValidationInfoUserWrong = {
        firstname: {
          valid: false,
          msg: "",
        },
        lastname: {
          valid: false,
          msg: "",
        },
        username: {
          valid: false,
          msg: "",
        },
        password: {
            valid: false,
            msg: "",
          },
        form: {
          valid: false,
          msg: "",
        },
      };
    
    const [formValidationInfo, setFormValidationInfo] = useState(
        formValidationInfoDEMO
      );
    

    useEffect(() => {
        if(entity === 'new') setCurrEntity(getExmplEntity(entityType))
        setUpdateOrCreate(entity === 'new' ? 'erstellen' : 'bearbeiten')
        if(entityType === 'Benutzer' && entity !== 'new') {
          setFormValidationInfo(formValidationInfoUserCorr) 
          setCurrEntity({...currEntity, password: ''})
        }
        if(entityType === 'Benutzer' && entity === 'new') setFormValidationInfo(formValidationInfoUserWrong)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entity, entityType,])

    function getTheme() {
        if (!localStorage.getItem("theme")) {
            localStorage.setItem("theme", "blackTheme");
        }
        return localStorage.getItem("theme");
    }

    const getExmplEntity = (_entity) => {
        let ent = {};

        switch(_entity) {
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

    function _onChange(event) {
        const { name, value } = event.target;
        setCurrEntity({...currEntity, [name]: value})
        if(entityType === 'Benutzer') validateField(name, value);
    }

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
    
        switch (name) {
          case "firstname":
            validationInfo = checkFirstname(value);
            break;
          case "lastname":
            validationInfo = checkLastname(value);
            break;
          case "username":
            validationInfo = checkUsername(value);
            break;
        case "password":
            validationInfo = checkPassword(value);
            break;
          default:
        }
    
        let newFormValidationInfo = {
          ...formValidationInfo,
          [name]: validationInfo,
        };
    
        newFormValidationInfo = checkForm(newFormValidationInfo);
        setFormValidationInfo(newFormValidationInfo);
      };

      function checkForm(newFormValidationInfo) {
        let valid = true;
        let msg = "ok";
        let validationInfo;
    
        for (let key in newFormValidationInfo) {
          if (!newFormValidationInfo[key].valid && key !== "form") {
            valid = false;
            msg = "not ok";
          }
        }
    
        validationInfo = { valid, msg };
        newFormValidationInfo["form"] = validationInfo;
    
        return newFormValidationInfo;
      }

    return (
        <div className={"full " + getTheme()}>
            <div className="grayback">
                <h4>{entityType} {updateOrCreate}</h4>
                {
                    Object.keys(currEntity).map(attr => {
                        if(attr !== '_id' && attr !== 'userId' && attr !== 'adminId' && attr !== 'admin' && attr !== 'htmlFormular') {
                            return (
                                <TextInputWithValidation
                                    formObject={currEntity}
                                    objectKey={attr}
                                    placeholder={attr}
                                    label={attr}
                                    onChange={_onChange}
                                    validClass=" "
                                    invalidClass=" "
                                    formValidationInfo={formValidationInfo}
                                ></TextInputWithValidation>
                            )
                        }
                        return ''
                    })
                }
                <div>
                    <button
                        className="button"
                        disabled={!formValidationInfo["form"]?.valid}
                        onClick={() => closeModal(currEntity)}
                        >
                        {updateOrCreate}
                    </button>
                    <button
                        style={{margin: '2%'}}
                        className="button"
                        onClick={() => closeModal('')}
                    >
                        abbrechen
                    </button>
                </div>
            </div>
        </div>
    )
}