import "./index.css";

export default function Main({ children, classes }){
    return(
        <main
            className={classes}
        >
            { children }
        </main>
    )
}
