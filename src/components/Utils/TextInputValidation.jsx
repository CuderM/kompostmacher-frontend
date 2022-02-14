import React from "react";
// import '../style/Login.css';

export default function TextInputValidation(props) {
  const {
    formObject,
    objectKey,
    label,
    placeholder,
    onChange,
    type,
    className,
  } = props;
  let inputType = type || "text";
  let design = className || "";
  let key = objectKey;

  return (
    <div className="form-group">
      <label htmlFor={`inputCtrl_${key}`} className="inputLabel">
        {label}
      </label>
      <input
        type={inputType}
        autoComplete="off"
        className={"form-control " + design}
        id={`inputCtrl_${key}`}
        name={key}
        placeholder={placeholder}
        value={formObject[key]}
        onChange={onChange}
      ></input>
      {/*<div className="valid-feedback">{formValidationInfo[key]?.msg}</div> 
      <div className="invalid-feedback">{formValidationInfo[key]?.msg}</div>*/}
    </div>
  );
}
