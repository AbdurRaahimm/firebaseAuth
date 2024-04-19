import { toast } from "react-toastify";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useNavigate } from "react-router-dom";


export default function CreatePost() {
    const navigate = useNavigate();
    const handleCreatePost = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const content = form.content.value;
        // validation 
        if (!title || !content) {
            return toast.error('All fields are required');
        }
        try {
            await addDoc(collection(db, 'posts'), {
                id: Date.now().toString(),
                title,
                content,
                createdAt: new Date().toISOString()
            });
            toast.success('Post created successfully');
            // navigate('/');
            form.reset();
        } catch (error) {
            console.log(error);
            toast.error('Failed to create post');
        }
    }
    return (
        <section className='shadow py-5 my-5 rounded-md w-6/12 mx-auto px-3'>
            <h1 className='text-2xl text-center'>Create Post</h1>
            <form className='flex flex-col justify-center align-middle' onSubmit={handleCreatePost}>
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Title :
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        autoComplete="given-title"
                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                    Content :
                </label>
                <div className="mt-2">
                    <textarea
                        name="content"
                        id="content"
                        autoComplete="given-content"
                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>


                <button type='submit' className='bg-blue-500 text-white py-2 mt-3 rounded-md'>
                    Create Post
                </button>
            </form>
        </section>
    )
}
