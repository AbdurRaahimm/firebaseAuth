import React from 'react'
import { Navigate } from 'react-router-dom';
import { getCookie } from '../lib/cookies';

export default function ProtectRoute({ children }) {
    const token = getCookie('token');

    return (
        token ? children : <Navigate to='/' />
    )
}
