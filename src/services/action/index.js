import { UPDATE_FORM } from "../constant";

export const onInputChange = (name, value, dispatch, formState) => {
  const password = name === "confirm_password" ? formState.password.value : "";
  const { hasError, error } = validateInput(name, value, password);
  let isFormValid = true;

  for (const key in formState) {
    const item = formState[key];
    if (key === name && hasError) {
      isFormValid = false;
      break;
    } else if (key !== name && item.hasError) {
      isFormValid = false;
      break;
    }
  }

  dispatch({
    type: UPDATE_FORM,
    data: { name, value, hasError, error, touched: false, isFormValid },
  });
};

export const validateInput = (name, value, password) => {
  let hasError = false,
    error = "";
  switch (name) {
    case "email":
      if (value.trim() === "") {
        hasError = true;
        error = "Email cannot be empty";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        hasError = true;
        error = "Invalid Email";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "password":
      if (value.trim() === "") {
        hasError = true;
        error = "Password cannot be empty";
      } else if (value.trim().length < 8) {
        hasError = true;
        error = "Password must have at least 8 characters";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "confirm_password":
      if (value.trim() === "") {
        hasError = true;
        error = "Confirm password cannot be empty";
      } else if (value.trim() !== password?.trim()) {
        hasError = true;
        error = "Password and Confirm Password must be same";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "name":
      if (value.trim() === "") {
        hasError = true;
        error = "Name cannot be empty";
      } else if (!/^[a-zA-Z ]+$/.test(value)) {
        hasError = true;
        error = "Invalid Name. Avoid Special characters";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "phone":
      if (value.trim() === "") {
        hasError = true;
        error = "Phone number cannot be empty";
      } else if (!/^[0-9]{10}$/.test(value)) {
        hasError = true;
        error =
          "Invalid phone Number. Use 10 digits only, without country code!";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "terms":
      if (!value) {
        hasError = true;
        error = "Please accept terms and conditions to continue!";
      } else {
        hasError = false;
        error = "";
      }
      break;
    default:
      break;
  }
  return { hasError, error };
};

export const onFocusOut = (name, value, dispatch, formState) => {
  const password = name === "confirm_password" ? formState.password.value : "";
  const { hasError, error } = validateInput(name, value, password);
  let isFormValid = true;
  for (const key in formState) {
    const item = formState[key];
    if (key === name && hasError) {
      isFormValid = false;
      break;
    } else if (key !== name && item.hasError) {
      isFormValid = false;
      break;
    }
  }

  dispatch({
    type: UPDATE_FORM,
    data: { name, value, hasError, error, touched: true, isFormValid },
  });
};
