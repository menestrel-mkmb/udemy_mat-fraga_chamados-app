import Aside from "../Aside";
import "./index.css";

export default function Wrapper({ children }){
    return(
        <>
        <Aside />
        <section
            className="wrapper"
        >
            {children}
        </section>
        </>
    )
}