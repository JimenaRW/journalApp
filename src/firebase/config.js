import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

// configuracion de firebase
const firebaseConfig = {
  apiKey: "AIzaSyBNhmXUs-Hz-I3_yCtknITh6Ci4VfJeUO0",
  authDomain: "intensivo-react-formar-2022.firebaseapp.com",
  projectId: "intensivo-react-formar-2022",
  storageBucket: "intensivo-react-formar-2022.appspot.com",
  messagingSenderId: "159727178447",
  appId: "1:159727178447:web:edacb833eb2a3d390e1dba",
};

// Inicializacion de Firebase
const app = initializeApp(firebaseConfig);

// Configuracióm la firebase
const db = getFirestore(app);

// Configuración de la autenticación de Google
const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider };
