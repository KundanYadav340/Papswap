import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../Context/appContext';

const PrivateComponents = ({children}) => {
    const {user,verification} = useAppContext();
    if(!user){
        return <Navigate to='/log' />
    }else{
        if(verification){
            return children;
        }else{
            return <Navigate to='/verifyEmail'/>
        }
    }
}

export default PrivateComponents;