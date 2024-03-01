import {
    createContext,
    useCallback,
    useEffect,
    useState
} from 'react';
import { useNavigate } from 'react-router-dom';

import { firebaseAuth, firebaseDb, firebaseStorage } from "../services/firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
    const [loginAttempt, setLoginAttempt] = useState(false);

    const autoredir = useNavigate();

    const loadUser = useCallback(async () => {
        const userLocal = localStorage.getItem("@ticketsPRO");
        if(userLocal){
            const userParsed = JSON.parse(userLocal) || null;
            setUser(userParsed);

            if(user){
                setName(user.name);
                setEmail(user.email);
                setAvatarUrl(user.avatarUrl);
            }
        }
    }, [user]);

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

    const getUserInfoByUid = async (uid) => {
        const docRef = doc(firebaseDb, "users", uid );
        const docSnap = await getDoc(docRef);

        setUser({...user,
            name: docSnap.data().nome,
            avatarUrl: docSnap.data().avatarUrl
        });
        localStorage.setItem("@ticketsPRO", JSON.stringify(user));
        setLoadingAuth(false);
    }

    const clearFields = () => {
        setEmail('');
        setPassword('');
        setName('');
        setUser(null);
    }

    const updateAvatar = (e, file) => {
        e.preventDefault();

        const docRef = ref(firebaseStorage, `images/${user.uid}/${file.name}`);
        uploadBytes(docRef, file)
        .then( async (value) => {
            toast.info("Foto enviada, aguarde processamento");
            await getDownloadURL(docRef)
            .then( async (url) => {
                await updateAvatarUrl(e, url)
                .then( () =>{
                    toast.success("Foto atualizada no sistema");
                });
            })
            .catch( (reason) => {
                toast.error("Problema ao atualizar imagem. Por favor, recarregue a página");
            })
        })
        .catch( (reason) => {
            toast.error("Problema ao enviar foto");
        });
    }

    const updateAvatarUrl = async (e, avatarUrl) => {
        e.preventDefault();
        const docRef = doc(firebaseDb, "users", user.uid);
        await updateDoc(docRef, {
            avatarUrl: avatarUrl
        })
        .then( () => {
            toast.success("URL atualizado com sucesso");
            setAvatarUrl(avatarUrl);
            setUser({...user, avatarUrl: avatarUrl});
            localStorage.setItem("@ticketsPRO", JSON.stringify(user));
        })
        .catch( (reason) => {
            toast.error("Problema ao atualizar nome");
        });
    }
    const updateName = async (e, newName) => {
        e.preventDefault();
        const docRef = doc(firebaseDb, "users", user.uid);
        await updateDoc(docRef, {
            nome: newName
        })
        .then( () => {
            toast.success("Nome atualizado com sucesso");
            setName(newName);
            setUser({...user, name: newName});
            localStorage.setItem("@ticketsPRO", JSON.stringify(user));
        })
        .catch( (reason) => {
            toast.error("Problema ao atualizar nome");
        });
    }

    const loginUser = async (e) => {
        e.preventDefault();
        setLoadingAuth(true);

        if(email === '' || password === '' ||
            !email || !password
        ) {
            setLoadingAuth(false);
        }

        setLoginAttempt(true);
        
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

    useEffect( () => {
        if(!user) loadUser();

        setLoadingPage(false);
    }, [user, loadUser]);

    return(
        <AuthContext.Provider 
            value={{
                signed: !!user,

                email, setEmail,
                password, setPassword,
                loginUser, loadUser,

                name, setName,
                createAccount,
                avatarUrl, setAvatarUrl,

                updateAvatar,
                updateName,

                user, setUser,
                getUserInfo,
                getUserInfoByUid,
                deleteUser,

                loadingAuth,
                loadingPage,
                loginAttempt,
            }}
        >
            { children }
        </AuthContext.Provider>
    );
}