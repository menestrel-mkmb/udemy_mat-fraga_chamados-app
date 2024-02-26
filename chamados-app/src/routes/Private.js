import { Navigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function PrivateRoute({ children }){
    const { signed } = useContext(AuthContext);

    console.log(signed);

    return !signed ?
        <Navigate to='/login' /> :
        <>{ children }</>
}