import React from 'react'

export default function Profile() {
    const user = JSON.parse(localStorage.getItem('user')) || [];
    return (
        <section className='text-center py-5'>
            <h1 className='text-3xl'>Profile Page </h1>
            <div className='flex justify-center items-center space-x-2 mt-5 border p-5'>
                <img 
                src={user?.photoURL || 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-person-user-icon-png.png'} 
                alt={user.displayName} 
                className='rounded-full' 
                width={100} />
                <div>
                    <h2 className='text-xl'>{user.displayName}</h2>
                    <p className='text-md'>{user.email}</p>
                </div>
            </div>
        </section>
    )
}
