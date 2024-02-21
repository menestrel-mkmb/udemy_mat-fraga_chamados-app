import { useState } from "react";
import { Link } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../services/firebaseConfig";

import styles from "./index.module.css";

export default function SignUp(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        <main
            className={styles.signup}
        >
            <article
                className={styles.signup__artc}
            >
                <img
                    className={styles.signup__img}
                    src="../../../assets/imgs/logo.png"
                    alt=" "
                />
                <h2
                    className={styles.signup__title}
                >
                    Faça seu cadastro na plataforma
                </h2>
                <form
                    className={styles.signup__forms}
                    onSubmit={createAccount}
                >
                    <section
                        className={styles.name__sect}
                    >
                        <label
                            className={styles.name__lbl}
                        >
                            nome
                        </label>
                        <input
                            className={styles.name__inp}
                            type="text"
                            placeholder="Fulano Cicrano Beltrano"
                            value={name}
                            onChange={e=>setName(e.target.value)}
                        />
                    </section>
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
                        className={styles.signup__btn}
                        type="submit"
                    >
                        Cadastrar
                    </button>
                    <Link
                        className={styles.register__lnk}
                        to='/login'
                    >
                        Já possui uma conta? Faça login
                    </Link>
                </form>
            </article>
        </main>
    )
}