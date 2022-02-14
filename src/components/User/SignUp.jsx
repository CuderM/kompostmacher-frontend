import React, { useState } from "react";
import TextInputWithValidation from "../Utils/TextInputValidation";
import { useHistory } from "react-router-dom";
import { userService } from "../../services/userService";

import { toast } from "react-toastify";

import "../../style/Login.css";

const Signup = () => {
  let formValidationInfoDEMO = {
    firstname: {
      valid: true,
      msg: "Firstname is okay",
    },
    lastname: {
      valid: true,
      msg: "Lastname is okay",
    },
    username: {
      valid: true,
      msg: "Username is okay",
    },
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
    firstname: "Melissa",
    lastname: "Muster",
    username: "mm@gmail.com",
    password: "",
    confirmPassword: "",
  });
  const [formValidationInfo, setFormValidationInfo] = useState(
    formValidationInfoDEMO
  );
  const history = useHistory();

  const submit = async (e) => {
    try {
      let user = formUser;
      delete user.confirmPassword;

      userService
        .create(user)
        .then((data) => {
          toast.success("User created");
          history.replace("/login");
        })
        .catch((err) => {
          toast.error(err.message);
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
      case "confirmPassword":
        validationInfo = checkValidatePassword(value);
        break;
      default:
    }

    let newFormValidationInfo = {
      ...formValidationInfo,
      [name]: validationInfo,
    };

    if (name === "password") {
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

  function checkFirstname(value) {
    let msg = "Firstname is okay";
    let valid = true;
    if (!value) {
      msg = "provide a first name";
      valid = false;
    } else {
      if (value.length < 4) {
        msg = "first name is too short";
        valid = false;
      }
    }
    return { valid, msg };
  }

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
      if (value !== formUser["password"]) {
        msg = "password has to be the same";
        valid = false;
      }
    }

    validationInfo = { valid, msg };

    return validationInfo;
  }

  function checkLastname(value) {
    let msg = "Last name is okay";
    let valid = true;
    if (!value) {
      msg = "provide a last name name";
      valid = false;
    } else {
      if (value.length < 4) {
        msg = "last name is too short";
        valid = false;
      }
    }
    return { valid, msg };
  }

  function checkUsername(value) {
    let msg = "email is okay";
    let valid = true;
    if (!value) {
      msg = "provide a email";
      valid = false;
    } else {
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value
        )
      ) {
        msg = "no valid email";
        valid = false;
      }
    }
    return { valid, msg };
  }

  function checkForm(newFormValidationInfo) {
    let value = false;
    let msg = "not ok";
    let validationInfo;

    if (
      newFormValidationInfo.firstname.valid &&
      newFormValidationInfo.lastname.valid &&
      newFormValidationInfo.username.valid
    ) {
      value = true;
      msg = "ok";
    }

    validationInfo = { value, msg };
    newFormValidationInfo["form"] = validationInfo;

    return newFormValidationInfo;
  }

  function toLogIn() {
    history.replace("/login");
  }

  return (
    <div className="myform grayback p20">
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

      <div className="form-row">
        <div className="form-group col-md-6">
          <TextInputWithValidation
            formObject={formUser}
            objectKey="password"
            label="Password"
            placeholder="password"
            type="password"
            formValidationInfo={formValidationInfo}
            onChange={onChange}
          ></TextInputWithValidation>
        </div>
        <div className="form-group col-md-6">
          <TextInputWithValidation
            formObject={formUser}
            objectKey="confirmPassword"
            label="Validate Password"
            placeholder="password"
            type="password"
            formValidationInfo={formValidationInfo}
            onChange={onChange}
          ></TextInputWithValidation>
        </div>
      </div>

      <button
        className="firstOption"
        disabled={!formValidationInfo["form"]?.value}
        onClick={() => submit()}
      >
        Sign Up
      </button>
      <p className="secondOption">
        Du hast schon einen Account?{" "}
        <button className="secondOption button" onClick={() => toLogIn()}>
          Log in
        </button>
      </p>
    </div>
  );
};

export default Signup;
