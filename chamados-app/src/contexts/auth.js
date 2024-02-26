import {
    createContext,
    useEffect,
    useState
} from 'react';
import { useNavigate } from 'react-router-dom';

import { firebaseAuth, firebaseDb } from "../services/firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { toast } from 'react-toastify';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [name, setName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState(null);
    
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);

    const autoredir = useNavigate();

    useEffect( () => {
        loadUser();

        setLoadingPage(false);
    }, []);

    const loadUser = async () => {
        const userLocal = localStorage.getItem("@ticketsPRO");
        if(userLocal){
            const userParsed = JSON.parse(userLocal) || null;
            setUser(userParsed);
        }
    }

    const getUserInfo = async (value) => {
        const docRef = doc(firebaseDb, "users", value.user.uid );
        const docSnap = await getDoc(docRef);

        const dataObj = {
            uid: value.user.uid,
            name: docSnap.data().nome,
            email: value.user.email,
            avatarUrl: docSnap.data().avatarUrl
        }

        setUser(dataObj);
        localStorage.setItem("@ticketsPRO", JSON.stringify(dataObj));
        setLoadingAuth(false);
    }

    const clearFields = () => {
        setEmail('');
        setPassword('');
        setName('');
        setUser(null);
    }

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
            getUserInfo(value);

            toast.success("Bem-vindo(a) ao sistema");
            autoredir("/dashboard");
        })
        .catch( (reason) => {
            toast.error("Problema ao fazer login");
            setLoadingAuth(false);
            console.log(reason);
            
            clearFields();
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
                const dataObj = {
                    uid: value.user.uid,
                    name: name,
                    email: email,
                    avatarUrl: null
                }
                setUser(dataObj);
                localStorage.setItem("@ticketsPRO", JSON.stringify(dataObj));

                toast.info("Lembre de confirmar seu e-mail antes de entrar");
                autoredir("/login");
            })
            .catch( (reason) => {
                console.log("Erro ao criar dados do usuário");
                console.log(reason);
                clearFields();
            })
        })
        .catch( (reason) => {
            console.log("Erro ao criar a conta");
            console.log(reason);
            clearFields();
        })
    };

    const deleteUser = () => {
        localStorage.clear();
        setUser(null);
    }

    return(
        <AuthContext.Provider 
            value={{
                signed: !!user,
                email, setEmail,
                password, setPassword,
                loginUser,

                name, setName,
                createAccount,
                avatarUrl, setAvatarUrl,

                user, setUser,
                deleteUser,
                loadingAuth,
                loadingPage,
            }}
        >
            { children }
        </AuthContext.Provider>
    );
}