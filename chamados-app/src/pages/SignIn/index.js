import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./index.module.css";

import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../services/firebaseConfig";

export default function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        if(email === '' || password === '') return;
        
        await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then( (value) => {
            console.log("Logado com sucesso");
            console.log(value);
        })
        .catch( (reason) => {
            console.log("Erro ao logar");
            console.log(reason);
        })
    }

    return(
        <main
            className={styles.login}
        >
            <article
                className={styles.login__artc}
            >
                <img
                    className={styles.login__img}
                    src="../../../assets/imgs/logo.png"
                    alt=" "
                />
                <h2
                    className={styles.login__title}
                >
                    Faça seu login na plataforma
                </h2>
                <form
                    className={styles.login__forms}
                    onSubmit={loginUser}
                >
                    <section
                        className={styles.email__sect}
                    >
                        <label
                            className={styles.email__lbl}
                        >
                            e-mail
                        </label>
                        <input
                            className={styles.email__inp}
                            type="email"
                            placeholder="you@mail.tld"
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                        />
                    </section>
                    <section
                        className={styles.password__sect}
                    >
                        <label
                            className={styles.password__lbl}
                        >
                            password
                        </label>
                        <input
                            className={styles.password__inp}
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                        />
                    </section>
                    <button
                        className={styles.login__btn}
                        type="submit"
                    >
                        Entrar
                    </button>
                    <Link
                        className={styles.register__lnk}
                        to='/signup'
                    >
                        Criar uma conta
                    </Link>
                </form>
            </article>
        </main>
    )
}