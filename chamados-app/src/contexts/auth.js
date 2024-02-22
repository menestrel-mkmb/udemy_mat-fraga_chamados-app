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

    const loginUser = async (e) => {
        e.preventDefault();

        if(email === '' || password === '' ||
            !email || !password
        ) return;
        
        await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then( (value) => {
            console.log("Logado com sucesso");
            setUser(value);
            console.log(user);

        })
        .catch( (reason) => {
            console.log("Erro ao logar");
            console.log(reason);
        });
    }

    const createAccount = async (e)=>{
        e.preventDefault();

        if(name === '' || email === '' || password === '') return;

        await createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then( (value) => {
            console.log("Conta criada com sucesso");
            console.log(value);
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
            }}
        >
            { children }
        </AuthContext.Provider>
    );
}