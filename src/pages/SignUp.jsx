import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";


export default function SignUp() {
    const [image, setImage] = React.useState(null);
    const navigate = useNavigate()
    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const form = e.target;
            if (form.username.value === '' || form.email.value === '' || form.password.value === '') {
                toast.error('Please fill all the fields')
                return
            }
            if (form.password.value !== form.confirmpassword.value) {
                toast.error('Password does not match')
                return
            }
            const formData = new FormData(form);
            const email = formData.get('email');
            const password = formData.get('password');
            await createUserWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser;
            updateProfile(user, {
                displayName: formData.get('username'),
            })
            toast.success('User created successfully')
            navigate('/signin')
        } catch (error) {
            toast.error(error.message)
        }
    }


    return (
        <section className='bg-gradient-to-r from-emerald-400 to-cyan-400 h-screen'>
            <div className="bg-white w-8/12 mx-auto translate-y-6 py-8 rounded-md ">
                <h1 className='text-3xl font-bold text-center'>SignUp</h1>
                <hr className='my-3' />
                <h2 className='text-center text-lg'>Welcome! Please sign up to your account</h2>
                
                <form className='w-1/3 mx-auto mt-5' onSubmit={handleSignUp}>
                    {/* username */}
                    <div className='mb-5'>
                        <label htmlFor='username' className='block text-sm font-medium text-gray-700'>Username</label>
                        <input type='text' id='username' name='username' className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                    </div>
                    <div className='mb-5'>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                        <input type='email' id='email' name='email' className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                    </div>
                    <div className='mb-5'>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                        <input type='password' id='password' name='password' className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                    </div>
                    {/* confirmpassword */}
                    <div className='mb-5'>
                        <label htmlFor='confirmpassword' className='block text-sm font-medium text-gray-700'>Confirm Password</label>
                        <input type='password' id='confirmpassword' name='confirmpassword' className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                    </div>                  
                    
                    <button type='submit' className='w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-2 py-1 rounded'>SignUp</button>
                </form>
                <p className='text-center'>
                    Already have an account? <Link to='/signin' className='text-blue-500'>SignIn</Link>
                </p>
            </div>
        </section>
    )
}
