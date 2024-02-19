import { Route, Routes } from 'react-router-dom';

import App from "../App";
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

export default function AppRoutes(){
    return(
    <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        
        <Route path='*' element={<App />} />
    </Routes>
    );
}