import { Navigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function PrivateRoute({ children }){
    const { signed, loadingPage } = useContext(AuthContext);

    if(loadingPage) return <></>;
    
    return !signed ?
        <Navigate to='/login' /> :
        <>{ children }</>
}