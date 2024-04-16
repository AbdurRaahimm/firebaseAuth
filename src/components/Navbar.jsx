import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { getCookie } from '../lib/cookies'
import { auth } from '../lib/firebase';

export default function Navbar() {
    const token = getCookie('token');
    const user = JSON.parse(localStorage.getItem('user')) || [];

    const handleSignOut = async () => {
        await signOut(auth);
        localStorage.removeItem('user');
        window.location.reload();
        // clear cookies
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    return (
        <header className='flex justify-between items-center  p-2 shadow'>
            <h1 className='text-xl font-bold'>Logo</h1>
            <nav>
                <ul className='flex justify-around space-x-2'>
                    <li className='border-r-2 pr-2 text-md font-semibold'>
                        <NavLink style={({ isActive }) => {
                            return {
                                color: isActive ? 'red' : 'black'
                            }
                        }} to='/'>Home</NavLink>
                    </li>
                    <li className='border-r-2 pr-2 text-md font-semibold'>
                        <NavLink style={({ isActive }) => {
                            return {
                                color: isActive ? 'red' : 'black'
                            }
                        }} to='/about'>About</NavLink>
                    </li>
                    <li className='text-md font-semibold'>
                        <NavLink style={({ isActive }) => {
                            return {
                                color: isActive ? 'red' : 'black'
                            }
                        }} to='/profile'>Profile</NavLink>
                    </li>
                </ul>
            </nav>
            {
                token ? (
                    <div className='flex justify-between space-x-1 items-center'>
                        <span> {user.displayName}</span>
                        <img src={user?.photoURL || 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-person-user-icon-png.png'} alt={user.displayName} className='w-8 h-8 rounded-full' />
                        <button onClick={handleSignOut} className='bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-2 py-1 rounded'>SignOut</button>
                    </div>
                ) : (
                    <Link to='/signin' className='bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-2 py-1 rounded'>SignIn</Link>
                )
            }

        </header>
    )
}
