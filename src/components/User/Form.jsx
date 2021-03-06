import { useEffect, useState } from "react";
import TextInputWithValidation from "../Utils/TextInputValidation";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useLocation } from "react-router-dom";
import { authService } from "../../services/authService";

export default function Form() {
  const location = useLocation();
  const {
    createFormValidInfo,
    getEntityById,
    entityCreate,
    entityUpdate,
    checkFields,
  } = location;

  let { id } = useParams();

  const FormMode = { NOT_FOUND: 0, NEW: 1, UPDATE: 2 };
  const [formMode, setFormMode] = useState(FormMode.NOT_FOUND);
  const [formEntity, setFormEntity] = useState({});

  const [formValidationInfo, setFormValidationInfo] = useState(
    createFormValidInfo(true)
  );
  const history = useHistory();
  

  useEffect(() => {
    let componentIsMounted = true;
    let exampleUser = {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
    }
    if (id.toLowerCase() === "new") {
      setFormMode(FormMode.NEW);
      setFormValidationInfo(createFormValidInfo(false));
      setFormEntity(exampleUser);
    } else {
      getEntityById(id)
        .then((u) => {
          if (componentIsMounted) {
            setFormEntity(u);
            setFormMode(FormMode.UPDATE);
          }
        })
        .catch((err) => {
          if (componentIsMounted) setFormMode(FormMode.NOT_FOUND);
        });
    }
  }, [
    FormMode.NEW,
    FormMode.NOT_FOUND,
    FormMode.UPDATE,
    id,
    getEntityById,
    createFormValidInfo
  ]);

  const validateField = (name, value) => {
    let newFormValidationInfo = checkFields(name, value, formValidationInfo);

    let formValid = true;

    Object.entries(newFormValidationInfo).map((prop) => {
      if (!prop[1].valid && prop[0] !== "form") {
        formValid = false;
      }
      return "";
    });

    newFormValidationInfo.form = {
      valid: formValid,
      msg: "",
    };

    setFormValidationInfo(newFormValidationInfo);
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormEntity({ ...formEntity, [name]: value });
    validateField(name, value);
  };

  const submitForm = (create) => {
    if (create) {
      entityCreate(formEntity)
        .then(() => history.push("/settings"))
        .catch((err) => toast.error(err));
    } else {
      entityUpdate(id, formEntity)
        .then(() => {
          formEntity.type = "session" 
          authService
            .login(formEntity)
            .then((data) => {
              history.push("/settings");
            })
            .catch((err) => {
              toast.error(err + ": Wrong email or password");
            });
        })
        .catch((err) => toast.error(err));
    }
  };

  function backToSettings() {
    history.replace("/settings");
  }

  return [
    <div className="content-wrapper grayback full">
      <i
        className="bi bi-chevron-left icon"
        onClick={() => backToSettings()}
      ></i>
      <form className="form-border">
        <div className="form-row">
          {Object.keys(formEntity).map((attr) => {
            if (attr === "_id" || attr === "state") return "";
            return (
              <div className="col">
                <TextInputWithValidation
                  formObject={formEntity}
                  objectKey={attr}
                  label={attr}
                  placeholder={attr}
                  type={attr === "password" ? "password" : "text"}
                  formValidationInfo={formValidationInfo}
                  onChange={onChange}
                ></TextInputWithValidation>
              </div>
            );
          })}
        </div>
        <br />
        {formMode === 1 && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              submitForm(true);
            }}
            disabled={!formValidationInfo["form"]?.valid}
          >
            Create
          </button>
        )}
        {formMode !== 1 && (
          <button
            type="button"
            className="button"
            onClick={() => {
              submitForm(false);
            }}
            disabled={!formValidationInfo["form"]?.valid}
          >
            Updaten
          </button>
        )}
      </form>
    </div>,
  ];
}
