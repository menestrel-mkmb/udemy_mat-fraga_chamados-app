import {
    createContext,
    useState
} from 'react';
import { useNavigate } from 'react-router-dom';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { firebaseAuth, firebaseDb } from "../services/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { toast } from 'react-toastify';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [name, setName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    
    const [user, setUser] = useState({});
    const [loadingAuth, setLoadingAuth] = useState(false);

    const autoredir = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        setLoadingAuth(true);

        if(email === '' || password === '' ||
            !email || !password
        ) {
            setLoadingAuth(false);
        }
        
        await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then( async (value) => {
            const docRef = doc(firebaseDb, "users", `${value.user.uid}` );

            const docSnap = await getDoc(docRef);
            setName(docSnap.data().nome);
            setAvatarUrl(docSnap.data().avatarUrl);
            storageUser(value);
            setLoadingAuth(false);

            toast.success("Bem-vindo(a) ao sistema");
            autoredir("/dashboard");
        })
        .catch( (reason) => {
            setLoadingAuth(false);

            toast.error("Problema ao fazer login");
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
                storageUser(value);
                toast.info("Lembre de confirmar seu e-mail antes de entrar");
                autoredir("/login");
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

    const storageUser = (data) => {
        const dataObj = {
            uid: data.user.uid,
            nome: name,
            email: data.user.email,
            avatarUrl: avatarUrl
        }
        setUser(dataObj);
        localStorage.setItem("@ticketsPRO", JSON.stringify(dataObj));
    }

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