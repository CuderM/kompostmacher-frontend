import React from "react";

export default function SelectInputValidation(props) {
  const {
    formObject,
    objectKey,
    label,
    onChange,
    options,
  } = props;
  let key = objectKey;

  return (
    <div className="form-group">
      <label htmlFor={`inputCtrl_${key}`}>{label}</label>
      <select
        value={formObject[key]}
        id={`inputCtrl_${key}`}
        name={key}
        className={"form-control  "}
        onChange={onChange}
      >
        {options.map((o) => {
          return (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          );
        })}
      </select>
      {/*<div className="valid-feedback">{formValidationInfo[key]?.msg}</div>
      <div className="invalid-feedback">{formValidationInfo[key]?.msg}</div>*/}
    </div>
  );
}
