export const errors = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return {
        code: "email",
        message: "Usuario ya registrado",
      };
    case "auth/invalid-email":
      return {
        code: "email",
        msg: "El email no es válido",
      };
    case "auth/user-not-found":
      return {
        code: "email",
        msg: "Credenciales inválidas",
      };
    case "auth/wrong-password":
      return {
        code: "password",
        msg: "La contraseña es incorrecta",
      };
    case "auth/network-request-failed":
      return {
        code: "internet",
        msg: "Falló la conexión",
      };
    case "auth/internal-error":
      return {
        code: "password",
        msg: "Complete el campo contraseña",
      };
    case "auth/popup-closed-by-user":
      return {
        code: "popup closed",
        msg: "popup closed by user",
      };

    default:
      return {
        code: "email",
        msg: "Ocurrió un error en el server",
      };
  }
};
