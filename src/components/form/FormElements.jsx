import React from "react";
import Elements from "../../data/formElements.json";
import { onFocusOut, onInputChange } from "../../services/action";

const FormElements = ({ formState, dispatch }) => {
  return Object.keys(Elements).map((element) => {
    return (
      <FormElement
        key={element}
        element={element}
        formState={formState}
        dispatch={dispatch}
      />
    );
  });
};

export default FormElements;

const FormElement = ({ element, formState, dispatch }) => {
  const { placeholder, type } = Elements[element];

  return (
    <label
      className={`form__input ${
        element === "phone" ? "form__input__phone" : ""
      }`}
    >
      {placeholder}
      <input
        type={type}
        name={element}
        value={formState[element]?.value}
        onChange={(e) => {
          onInputChange(element, e.target.value, dispatch, formState);
        }}
        onBlur={(e) => {
          onFocusOut(element, e.target.value, dispatch, formState);
        }}
      />
      {formState[element].hasError && (
        <span className="form__input--error">{formState[element]?.error}</span>
      )}
    </label>
  );
};
