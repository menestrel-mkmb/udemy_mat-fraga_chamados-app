import {
    createContext,
    useState
} from 'react';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { firebaseAuth } from "../services/firebaseConfig";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [name, setName] = useState('');
    
    const [user, setUser] = useState({});
    const [loadingAuth, setLoadingAuth] = useState(false);

    const loginUser = async (e) => {
        e.preventDefault();
        setLoadingAuth(true);

        if(email === '' || password === '' ||
            !email || !password
        ) {
            setLoadingAuth(false);
            return;
        }
        
        await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then( (value) => {
            setUser(value);
            setLoadingAuth(false);

            console.log(user);
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
        .then( (value) => {
            console.log("Conta criada com sucesso");
            setUser({
                uid: value.user.uid,
                name: value.user.displayName,
                email: value.user.email,
                verified: value.user.emailVerified,
            });
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
            { children }
        </AuthContext.Provider>
    );
}