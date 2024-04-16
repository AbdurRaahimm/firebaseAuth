import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function ForgotPassword() {
    const navigate = useNavigate();
    
    const handleForgotPassword = async(e) => {
        e.preventDefault();
        const email = e.target.email.value;
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success('Password reset email sent');
            navigate('/signin');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please check your email and try again');
        }
    }
    return (
        <section className='bg-gradient-to-r from-emerald-400 to-cyan-400 h-screen'>
            <div className="bg-white w-8/12 mx-auto translate-y-2/3 py-8 rounded-md ">
                <h1 className='text-3xl font-bold text-center'>Forgot Password ?</h1>
                <p className='text-center text-gray-500'>Enter your email to reset your password</p>                
                <form className='w-1/3 mx-auto mt-5' onSubmit={handleForgotPassword}>

                    <div className='mb-5'>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                        <input type='email' id='email' name='email' className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                    </div>
                   
                    <button type='submit' className='w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-2 py-1 rounded'>Submit</button>
                </form>
            </div>
        </section>
    )
}
