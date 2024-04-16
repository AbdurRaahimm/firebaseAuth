import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider   } from "firebase/auth";
import { auth } from '../lib/firebase';
import { setCookie } from '../lib/cookies';

export default function SignIn() {
    const navigate = useNavigate()
    const handleSignIn = async (e) => {
        e.preventDefault()
        try {
            const form = e.target;
            if (form.email.value === '' || form.password.value === '') {
                alert('Please fill all the fields')
                return
            }
            const formData = new FormData(form);
            const email = formData.get('email');
            const password = formData.get('password');
            await signInWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser;
            // console.log(user)
            setCookie('token', user.accessToken, 60);
            localStorage.setItem('user', JSON.stringify(user.providerData[0]));
            toast.success('User SignIn successfully')
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
    }

    const googleSignin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setCookie('token', user.accessToken, 60);
            localStorage.setItem('user', JSON.stringify(user.providerData[0]));
            toast.success('User SignIn successfully')
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
    }

    const facebookSignin = async () => {
        try {
            const provider = new FacebookAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setCookie('token', user.accessToken, 60);
            localStorage.setItem('user', JSON.stringify(user.providerData[0]));
            toast.success('User SignIn successfully')
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <section className='bg-gradient-to-r from-emerald-400 to-cyan-400 h-screen'>
            <div className="bg-white w-8/12 mx-auto translate-y-12 py-8 rounded-md ">
                <h1 className='text-3xl font-bold text-center'>SignIn</h1>
                <hr className='my-3' />
                <h2 className='text-center text-lg'>Welcome back! Please sign in to your account</h2>
                {/* social media login */}
                <div className='flex justify-center space-x-2 mt-5'>
                    <button onClick={googleSignin} className='bg-blue-500 text-white px-2 py-1 rounded'>Google</button>
                    <button onClick={facebookSignin} className='bg-blue-500 text-white px-2 py-1 rounded'>Facebook</button>
                </div>
                
                <form className='w-1/3 mx-auto mt-5' onSubmit={handleSignIn}>

                    <div className='mb-5'>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                        <input type='email' id='email' name='email' className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                    </div>
                    <div className='mb-5'>
                        <div className="flex justify-between">
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                            <Link to='/forgotpassword' className='text-blue-500'>Forgot Password?</Link>
                        </div>
                        <input type='password' id='password' name='password' className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                    </div>

                    <button type='submit' className='w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-2 py-1 rounded'>SignIn</button>
                </form>
                <p className='text-center'>
                    Already have an account? <Link to='/signup' className='text-blue-500'>SignUp</Link>
                </p>
            </div>
        </section>
    )
}
