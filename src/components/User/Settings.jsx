import React, { useEffect, useState } from "react";
import "../../style/Settings.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { userService } from "../../services/userService.js";
import { authService } from "../../services/authService";

export default function Settings({ setUserStatus }) {
  const history = useHistory();
  const [userName, setUserName] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    getUser()
      .then((data) => {
        setUser(data);
        setUserName(data.firstname + " " + data.lastname);
      })
      .catch((err) => toast.error(err.toString()));
  }, []);

  async function getUser() {
    let user = await authService.getCurrentUser();

    return user;
  }

  async function logout() {
    await authService.logout();
    setUserStatus("login");
    history.push("/login");
  }

  function bearbeiten() {
    _openEditForm(
      "settings/editUser/" + user._id,
      (valid) => {
        return {
          firstname: {
            valid: valid,
            msg: "",
          },
          lastname: {
            valid: valid,
            msg: "",
          },
          username: {
            valid: valid,
            msg: "",
          },
          form: {
            valid: valid,
            msg: "",
          },
          password: {
            valid: valid,
            msg: "",
          },
        };
      },
      userService.getById,
      userService.create,
      userService.update,
      (name, value, formValidInfo) => {
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

        return {
          ...formValidInfo,
          [name]: validationInfo,
        };
      },
      "Benutzer"
    );
  }

  const _openEditForm = (
    _url,
    _createFormValidInfo,
    _getEntityById,
    _entityCreate,
    _entityUpdate,
    _checkFields,
    _entity
  ) => {
    history.push({
      pathname: _url,
      createFormValidInfo: _createFormValidInfo,
      getEntityById: _getEntityById,
      entityCreate: _entityCreate,
      entityUpdate: _entityUpdate,
      checkFields: _checkFields,
      entity: _entity,
    });
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

  function themeSwitch() {
    if (localStorage.getItem("theme") === "blackTheme") {
      localStorage.setItem("theme", "whiteTheme");
      window.location.reload(false);
    } else {
      localStorage.setItem("theme", "blackTheme");
      window.location.reload(false);
    }
  }

  return (
    <div className="full settingsGrid">
      <div className="profileRow grayback">
        <div className="line-wrapper">
          <h2>Profile</h2>
          <button
            className="button topRight right"
            onClick={() => bearbeiten()}
          >
            Benutzer bearbeiten
          </button>
        </div>
        <div className="line-wrapper">
          <p>Eingeloggt als: </p>
          <p style={{ color: "green", display: "inline-block" }}> {userName}</p>
        </div>
        <button className="button bottom" onClick={() => logout()}>
          log out
        </button>
        <button className="button topRight right" onClick={() => themeSwitch()}>
          Theme ändern
        </button>
      </div>
    </div>
  );
}
