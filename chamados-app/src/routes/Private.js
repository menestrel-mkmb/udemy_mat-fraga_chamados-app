import { Navigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function PrivateRoute({ children }){
    const { signed } = useContext(AuthContext);

    return !signed ?
        <Navigate to='/login' /> :
        <>{ children }</>
}