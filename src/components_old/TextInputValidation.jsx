import React from 'react'
// import '../style/Login.css';

export default function TextInputWithValidation(props) {
    const { formObject, objectKey, label, placeholder, formValidationInfo, onChange, type } = props;
    let inputType = type || "text";
    let key = objectKey;

    return (
        <div className="form-group">
            <label htmlFor={`inputCtrl_${key}`} className="inputLabel">{label}</label>
            <input
                type={inputType}
                autoComplete="off"
                className={!formValidationInfo[key]?.valid ? "form-control is-invalid" : "form-control is-valid"}
                id={`inputCtrl_${key}`}
                name={key}
                placeholder={placeholder}
                value={formObject[key]}
                onChange={onChange}>
            </input>
            <div className="valid-feedback">{formValidationInfo[key]?.msg}</div>
            <div className="invalid-feedback">{formValidationInfo[key]?.msg}</div>
        </div>
    )
}