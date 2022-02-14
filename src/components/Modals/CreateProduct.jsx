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

  return (
    <div className={"full " + getTheme()}>
      <div className="grayback">
      <SelectInputValidation
            formObject={selectedInput.products}
            objectKey="product"
            label="Produkt: "
            onChange={onChange}
            validClass=" "
            invalidClass=" "
            options={options}
        ></SelectInputValidation>
        <TextInputValidation
            type="number" 
            formObject={{}}
            objectKey="amount"
            placeholder="Menge"
            label="Menge: "
            onChange={onChange}
        ></TextInputValidation>

        <button
          className="button"
          onClick={() => closeModal()}
        >
          erstellen
        </button>
      </div>
    </div>
  );
}
