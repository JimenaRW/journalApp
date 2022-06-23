import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "../../hooks/useForm";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const { loading, msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: "rociowiti@gmail.com",
    password: "123123",
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();

    //dispatch(login(123123, "Patito"));
    dispatch(startLoginEmailPassword(email, password));
  };

  const handleGoogleLoggin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <>
      <h3 className="auth__title mb-5">Login</h3>
      <form onSubmit={handleLogin}>
        {msgError && <div className="auth__alert-error">{msgError.msg}</div>}

        <input
          type="text"
          placeholder="Email"
          name="email"
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
        <button
          type="submit"
          className="buttons__btn buttons__btn-primary buttons__btn-block"
          disabled={loading === true}
        >
          Login
        </button>
        <div className="auth__social-networks">
          <p>Login con redes sociales</p>
          <div className="google-btn" onClick={handleGoogleLoggin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Logueate con Google</b>
            </p>
          </div>
        </div>
        <Link to="/journalApp/auth/register" className="links__link">
          Registrate
        </Link>
      </form>
    </>
  );
};

export default LoginScreen;
