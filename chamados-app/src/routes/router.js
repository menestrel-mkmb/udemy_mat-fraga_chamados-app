import { Route, Routes } from 'react-router-dom';

import App from "../App";
import Dashboard from '../pages/Dashboard';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import PrivateRoute from './Private';

export default function AppRoutes(){
    return(
    <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard' element={ <PrivateRoute><Dashboard /></PrivateRoute>} />
        
        <Route path='*' element={<App />} />
    </Routes>
    );
}