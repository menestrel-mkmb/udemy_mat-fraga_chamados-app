import {
    createContext,
    useState
} from 'react';
import { Navigate } from 'react-router-dom';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { firebaseAuth, firebaseDb } from "../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [name, setName] = useState('');
    
    const [user, setUser] = useState({});
    const [authOk, setAuthOk] = useState(false);
    const [signOk, setSignOk] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(false);

    const loginUser = async (e) => {
        e.preventDefault();
        setLoadingAuth(true);

        if(email === '' || password === '' ||
            !email || !password
        ) {
            setLoadingAuth(false);
        }
        
        await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then( (value) => {
            setUser(value);
            setLoadingAuth(false);

            console.log(user);
            setAuthOk(true);
        })
        .catch( (reason) => {
            setLoadingAuth(false);

            console.log("Erro ao logar");
            console.log(reason);
        });
    }

    const createAccount = async (e)=>{
        e.preventDefault();

        if(name === '' || email === '' || password === '') {
            setLoadingAuth(false);
            return;
        }

        await createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then( async (value) => {
            const docRef = doc(firebaseDb, "users", value.user.uid);
            await setDoc(docRef, {
                nome: name,
                avatarUrl: null,
            })
            .then( () => {
                setUser({
                    uid: value.user.uid,
                    name: value.user.displayName,
                    email: value.user.email,
                    verified: value.user.emailVerified,
                });
                setSignOk(true);
            })
            .catch( (reason) => {
                console.log("Erro ao criar dados do usuário");
                console.log(reason);
            })
        })
        .catch( (reason) => {
            console.log("Erro ao criar a conta");
            console.log(reason);
        })
    };

    return(
        <AuthContext.Provider 
            value={{
                email, setEmail,
                password, setPassword,
                loginUser,

                name, setName,
                createAccount,

                user, setUser,
                loadingAuth,
            }}
        >
            { authOk && <Navigate to="/dashboard" />}
            { signOk && <Navigate to="/login" />}
            { children }
        </AuthContext.Provider>
    );
}