import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { formsReducer, initialState } from "../../services/reducer";
import { onFocusOut, validateInput } from "../../services/action";
import { UPDATE_FORM } from "../../services/constant";
import FormElements from "./FormElements";
import "../../styles/form.scss";

const Form = () => {
  const [formState, dispatch] = useReducer(formsReducer, initialState);
  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    let isFormValid = true;

    for (const name in formState) {
      const item = formState[name];
      const { value } = item;
      const password =
        name === "confirm_password" ? formState.password.value : "";
      const { hasError, error } = validateInput(name, value, password);
      if (hasError) {
        isFormValid = false;
      }
      if (name) {
        dispatch({
          type: UPDATE_FORM,
          data: {
            name,
            value,
            hasError,
            error,
            touched: true,
            isFormValid,
          },
        });
      }
    }

    if (isFormValid) navigate("/welcome", { state: { isAuthenticated: true } });
  };

  return (
    <form className="form" onSubmit={(e) => formSubmitHandler(e)}>
      <FormElements formState={formState} dispatch={dispatch} />
      <label className="form__input__terms">
        <input
          type="checkbox"
          name="terms"
          checked={formState.terms.value}
          onChange={(e) => {
            onFocusOut("terms", e.target.checked, dispatch, formState);
          }}
        />
        <b>I read and agree Terms and Conditions</b>
        {formState.terms.hasError && (
          <>
            <br />
            <span className="error">{formState.terms.error}</span>
          </>
        )}
      </label>
      <input
        type="submit"
        value="Create account"
        className="form__input form__input__submit"
      />
    </form>
  );
};

export default Form;
