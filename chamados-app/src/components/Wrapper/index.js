import Aside from "../Aside";
import "./index.css";

export default function Wrapper({ children }){
    return(
        <>
        <section
            className="wrapper"
        >
            <Aside />
            {children}
        </section>
        </>
    )
}