import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const initializeAuthenticarion = () =>{
    initializeApp(firebaseConfig);
}

export default initializeAuthenticarion