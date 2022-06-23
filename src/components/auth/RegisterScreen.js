import { Link } from "react-router-dom";
import validator from "validator";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

const RegisterScreen = () => {
  const dispatch = useDispatch();

  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: "Rocio",
    email: "rociowiti@gmail.com",
    password: "123123",
    password2: "123123",
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    switch (true) {
      case name.trim().length === 0:
        dispatch(setError("El nombre es requerido"));
        return false;
      case !validator.isEmail(email):
        dispatch(setError("El email es inválido"));
        return false;
      case password.length < 6:
        dispatch(setError("La contraseña debe tener 6 caracteres"));
        return false;
      case password !== password2:
        dispatch(setError("Revise la verificación de la contraseña"));
        return false;

      default:
        dispatch(removeError());
        return true;
    }
  };

  return (
    <>
      <h3 className="auth__title mb-5">Register</h3>
      {
        <div className="auth__alert-error" style={{ display: "none" }}>
          error
        </div>
      }
      <form onSubmit={handleRegister}>
        {msgError && <div className="auth__alert-error">{msgError.msg}</div>}
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="buttons__btn buttons__btn-primary buttons__btn-block mb-5"
        >
          Register
        </button>

        <Link to="/journalApp/auth/login" className="links__link">
          ¿Estás registrado/a?
        </Link>
      </form>
    </>
  );
};

export default RegisterScreen;
