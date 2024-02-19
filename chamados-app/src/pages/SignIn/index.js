import { Link } from "react-router-dom";

import styles from "./index.module.css";
import { useState } from "react";

export default function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <main
            className={styles.login}
        >
            <article
                className={styles.login__artc}
            >
                <img
                    className={styles.login__img}
                    src=""
                    alt=" "
                />
                <h2
                    className={styles.login__title}
                >
                    Faça seu login na plataforma
                </h2>
                <form
                    className={styles.login__forms}
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
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                        />
                    </section>
                    <button
                        className={styles.login__btn}
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