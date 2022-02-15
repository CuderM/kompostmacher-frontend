import React from "react";
import TextInputValidation from "../Utils/TextInputValidation";
import SelectInputValidation from "../Utils/SelectInputValidation";

export default function CreateProduct({ closeModal, options, selectedInput, onChange}) {

  function getTheme() {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "blackTheme");
    }
    return localStorage.getItem("theme");
  }

  const formValidationInfo= {
    form: {
      valid: true,
      msg: "",
    },
  };

  return (
    <div className={"full " + getTheme()}>
      <div className="grayback">
      <SelectInputValidation
            formObject={selectedInput.products}
            objectKey="product"
            label="Produkt: "
            onChange={onChange}
            options={options}
        ></SelectInputValidation>
        <TextInputValidation
            type="number" 
            formObject={{}}
            objectKey="amount"
            placeholder="1"
            label="Menge: "
            onChange={onChange}
            validClass=" "
            invalidClass=" "
            formValidationInfo={formValidationInfo}
        ></TextInputValidation>

        <button
          className="button"
          onClick={() => closeModal(true)}
        >
          erstellen
        </button>
        <button
          style={{margin: '2%'}}
          className="button"
          onClick={() => closeModal(false)}
        >
          abbrechen
        </button>
      </div>
    </div>
  );
}
