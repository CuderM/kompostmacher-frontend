import React, { useState } from "react";
import TextInputWithValidation from "../Utils/TextInputValidation";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { authService } from "../../services/authService";

const Login = ({ setUserStatus }) => {
  let formValidationInfoDEMO = {
    username: {
      valid: false,
      msg: "",
    },
    form: {
      valid: false,
      msg: "",
    },
    password: {
      valid: false,
      msg: "",
    },
  };

  const [formUser, setFormUser] = useState({
    username: "",
    password: "",
    type: "session",
  });
  const [formValidationInfo, setFormValidationInfo] = useState(
    formValidationInfoDEMO
  );
  const history = useHistory();

  const submit = async (e) => {
    try {
      let user = formUser;

      authService
        .login(user)
        .then((data) => {
          history.push("/overview");
          setUserStatus(user);
        })
        .catch((err) => {
          toast.error(err + ": Wrong email or password");
        });
    } catch (err) {
      toast.error(err.message);
    }
  };

  function toSignUp() {
    history.replace("/signup");
  }

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormUser({ ...formUser, [name]: value });
    validateField(name, value);
  };

  const onKLIChange = (event) => {
    const { name, value } = event.target;
    let nVal;
    value ? (nVal = "local") : (nVal = "session");
    setFormUser({ ...formUser, [name]: nVal });
  };

  const validateField = (name, value) => {
    let validationInfo;

    switch (name) {
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

  function checkPassword(value) {
    let msg = "";
    let valid = true;
    if (!value) {
      msg = "provide a password";
      valid = false;
    }
    return { valid, msg };
  }

  const sendEmailPWChange = () => {
    
    authService.getEmailPWChange(formUser.username)
    .then(() => {
      toast.info('email sent')
      authService.logout();
    })
  }

  function checkUsername(value) {
    let msg = "email is okay";
    let valid = true;
    if (!value) {
      msg = "provide a email";
      valid = false;
    } else {
    //   if (
    //     !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    //       value
    //     )
    //   ) {
    //     msg = "no valid email";
    //     valid = false;
    //   }
    }
    return { valid, msg };
  }

  function checkForm(newFormValidationInfo) {
    let value = false;
    let msg = "not ok";
    let validationInfo;

    if (
      newFormValidationInfo.username.valid &&
      newFormValidationInfo.password.valid
    ) {
      value = true;
      msg = "ok";
    }

    validationInfo = { value, msg };
    newFormValidationInfo["form"] = validationInfo;

    return newFormValidationInfo;
  }

  return (
    <div className="myform grayback p20">
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

      <button
        className="firstOption button"
        disabled={!formValidationInfo["form"]?.value}
        onClick={() => submit()}
      >
        LOG IN
      </button>
      {
        <p className="secondOption">
          Angemeldet bleiben?{" "}
          <input name="type" type="checkbox" onClick={onKLIChange}></input>
        </p>
      }

      <p className="secondOption2">
        Du hast noch keinen Account?{" "}
        <button className="secondOption2 button" onClick={() => toSignUp()}>
          SIGN UP
        </button>
      </p>
        <p className="secondOption2">
        Du hast dein Passwort vergessen?{" "}
        <button className="secondOption2 button" onClick={() => sendEmailPWChange()}>
          RESET PASSWORT
        </button>
      </p>
    </div>
  );
};

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// }

export default Login;
