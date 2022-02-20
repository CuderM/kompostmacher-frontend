import React, { useEffect, useState } from "react";
import "../../style/Settings.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";

import { userService } from "../../services/userService.js";
import { authService } from "../../services/authService";

import Form from '../Modals/Form'

export default function Settings({ setUserStatus }) {
  const history = useHistory();
  const [userName, setUserName] = useState();
  const [user, setUser] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function closeModal(entity) {
      setModalIsOpen(false)

      if(entity !== '') {
        setUser(entity)
        setUserName(entity.firstname + " " + entity.lastname);

        userService.update(entity._id, entity)
          .then(ent => {
            toast.error(ent)
          })
          .catch(err => {
              toast.error(err)
        })
      }
    }

  useEffect(() => {
    getUser()
      .then((data) => {
        delete data.email
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

  const customStyles = {
    content: {
      top: "15%",
      left: "25%",
      right: "25%",
      bottom: "auto",
      background: "#0C0F1F",
      color: "white",
      borderColor: 'darkgrey',
      borderWidth: '2px',
      borderRadius: '20px',
    },
};

if (localStorage.getItem("theme") === "whiteTheme") {
    customStyles.content.background = "white";
    customStyles.content.color = "black";
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
            onClick={() => setModalIsOpen(true)}
          >
            Benutzer bearbeiten
          </button>
        </div>
        <div className="line-wrapper">
          <p>Eingeloggt als: </p>
          <p style={{ color: "green", display: "inline-block" }}>{userName}</p>
        </div>
        <button className="button bottom" onClick={() => logout()}>
          log out
        </button>
        <button className="button topRight right" onClick={() => themeSwitch()}>
          Theme ändern
        </button>
      </div>
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          overlayClassName="Overlay"
          ariaHideApp={false}
      >
          <Form
              closeModal={closeModal}
              entity={user}
              entityType='Benutzer'
          ></Form>
      </Modal>
    </div>
  );
}
