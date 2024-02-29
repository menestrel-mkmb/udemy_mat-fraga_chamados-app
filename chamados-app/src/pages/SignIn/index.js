import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

import { AuthContext } from "../../contexts/auth";
import Main from "../../components/Main";

export default function SignIn(){
    const { 
        email, setEmail,
        password, setPassword,
        loginUser, signed,
        deleteUser,

        loadingAuth,
        loginAttempt
    } = useContext(AuthContext);

    useEffect(() => {
        if(signed && !loginAttempt) deleteUser();
    }, [deleteUser, loginAttempt, signed]);

    return(
        <Main
            classes="main main__sect login"
        >
            <article
                className="login__artc"
            >
                <img
                    className="login__img"
                    src="../../../assets/imgs/logo.png"
                    alt=" "
                />
                <h2
                    className="login__title"
                >
                    Faça seu login na plataforma
                </h2>
                { loginAttempt &&
                    <p
                        className="redirect__txt"
                    >
                        Não foi redirecionado? Clique 
                        <Link to='/dashboard'> aqui</Link>
                    </p>
                }
                <form
                    className="login__forms"
                    onSubmit={loginUser}
                >
                    <section
                        className="email__sect"
                    >
                        <label
                            className="email__lbl"
                        >
                            e-mail
                        </label>
                        <input
                            className="email__inp"
                            type="email"
                            placeholder="you@mail.tld"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    </section>
                    <section
                        className="password__sect"
                    >
                        <label
                            className="password__lbl"
                        >
                            password
                        </label>
                        <input
                            className="password__inp"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                        />
                    </section>
                    <button
                        className="login__btn"
                        type="submit"
                    >
                        {loadingAuth ?
                        "Aguarde, carregando..." :
                            "Entrar"}
                    </button>
                    <Link
                        className="register__lnk"
                        to='/signup'
                    >
                        Criar uma conta
                    </Link>
                </form>
            </article>
        </Main>
    )
}