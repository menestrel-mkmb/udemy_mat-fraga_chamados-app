import { Route, Routes } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import PrivateRoute from './Private';

import Error from '../pages/Error';
import Customers from '../pages/Customers';
import Profile from '../pages/Profile';

export default function AppRoutes(){
    return(
    <Routes>
        <Route path='/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/dashboard' element={ <PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/customers' element={ <PrivateRoute><Customers /></PrivateRoute>} />
        <Route path='/profile' element={ <PrivateRoute><Profile /></PrivateRoute>} />
        
        <Route path='/login' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        
        <Route path='*' element={<Error />} />
    </Routes>
    );
}