import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.Confiq";

const AuthenticationInitialize = () =>{
    
    initializeApp(firebaseConfig);
};

export default AuthenticationInitialize;