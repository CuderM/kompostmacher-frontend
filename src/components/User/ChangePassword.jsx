import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import { authService } from "../../services/authService";
import TextInputWithValidation from "../Utils/TextInputValidation";

const ChangePassword = ({setUserStatus}) => {
    let { username } = useParams();
    let formValidationInfoDEMO = {
        form: {
          valid: false,
          msg: "",
        },
        password: {
          valid: false,
          msg: "",
        },
        confirmPassword: {
          valid: false,
          msg: "",
        },
      };
    
      const [formUser, setFormUser] = useState({
        username: username,
        newpassword: "",
        confirmPassword: "",
        type: "session", 
      });
      const [formValidationInfo, setFormValidationInfo] = useState(
        formValidationInfoDEMO
      );
      const history = useHistory();
    
      const submit = async (e) => {
        try {
            let user = formUser;
            delete user.confirmPassword;
            delete user.oldpassword;
    
            authService
            .changePassword({newPW: formUser.newpassword, username: formUser.username})
                .then(info => {
                    user.password = user.newpassword
                    authService
                    .login(user)
                        .then(useless => {
                            toast.success(info);
                            history.push("/overview");
                            setUserStatus(useless);
                        })
                        .catch(err => {
                            toast.error(err + ": Wrong email or password");
                        })
                })
                .catch(err => {
                    console.error(err)
                    toast.error(err + ": saving new password failed");
                });

            } catch (err) {
            toast.error(err);
            }
      };
    
      const onChange = (event) => {
        const { name, value } = event.target;
        setFormUser({ ...formUser, [name]: value });
        validateField(name, value);
      };
    
      const validateField = (name, value) => {
        let validationInfo;
    
        switch (name) {
            case "newpassword":
                validationInfo = checkPassword(value);
                break;
            case "confirmPassword":
                validationInfo = checkValidatePassword(value);
                break;
            default:
        }
    
        let newFormValidationInfo = {
          ...formValidationInfo,
          [name]: validationInfo,
        };
    
        if (name === "newpassword") {
          let valid = true;
          let msg = "";
          if (value !== formUser["confirmPassword"]) {
            valid = false;
            msg = "password has to be the same";
          }
          newFormValidationInfo["confirmPassword"] = { valid, msg };
        }
    
        newFormValidationInfo = checkForm(newFormValidationInfo);
        setFormValidationInfo(newFormValidationInfo);
      };

      function checkPassword(value) {
        let msg = "Password is okay";
        let valid = true;
        if (!value) {
          msg = "provide a password";
          valid = false;
        } else {
          if (value.length < 4) {
            msg = "password is too short";
            valid = false;
          }
        }
        return { valid, msg };
      }
    
      function checkValidatePassword(value) {
        let valid = true;
        let msg = "password is okay";
        let validationInfo;
    
        if (!value) {
          msg = "validate password";
          valid = false;
        } else {
          if (value !== formUser["newpassword"]) {
            msg = "password has to be the same";
            valid = false;
          }
        }
    
        validationInfo = { valid, msg };
    
        return validationInfo;
      }
    
      function checkForm(newFormValidationInfo) {
        let value = true;
        let msg = "ok";
        let validationInfo;

        validationInfo = { value, msg };
        newFormValidationInfo["form"] = validationInfo;
    
        return newFormValidationInfo;
      }

      const onKLIChange = (event) => {
        const { name, value } = event.target;
        let nVal;
        value ? (nVal = "local") : (nVal = "session");
        setFormUser({ ...formUser, [name]: nVal });
      };
    
      return (
        <div className="myform grayback p20">
          <h1 className="formLabel">Change Password of {username}</h1>
    
          <div className="form-row">
        <div className="form-group col-md-6">
          <TextInputWithValidation
            formObject={formUser}
            objectKey="newpassword"
            label="neues Password"
            placeholder="neues Passwort"
            type="password"
            formValidationInfo={formValidationInfo}
            onChange={onChange}
          ></TextInputWithValidation>
        </div>
        <div className="form-group col-md-6">
          <TextInputWithValidation
            formObject={formUser}
            objectKey="confirmPassword"
            label="neues Password bestätigen"
            placeholder="neues Passwort"
            type="password"
            formValidationInfo={formValidationInfo}
            onChange={onChange}
          ></TextInputWithValidation>
        </div>
      </div>
    
          <button
            className="firstOption button"
            disabled={!formValidationInfo["form"]?.value}
            onClick={() => submit()}
          >
            Passwort ändern
          </button>
          {
            <p className="secondOption">
              Angemeldet bleiben?{" "}
              <input name="type" type="checkbox" onClick={onKLIChange}></input>
            </p>
          }
        </div>
      );
};
export default ChangePassword;
