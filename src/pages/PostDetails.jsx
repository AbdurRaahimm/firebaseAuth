import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { doc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function PostDetails() {
    const locate = useLocation();
    const post = locate.state;
    const navigate = useNavigate();
    // console.log(post);
    const deletePost = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'posts'));
            querySnapshot.forEach(async (docs) => {
                // console.log(docs.data().id === post.id);
                if (docs.data().id === post.id) {
                    await deleteDoc(doc(db, 'posts', docs.id));
                }
            });
            toast.success('Post deleted successfully');
            navigate('/');
        } catch (error) {
            console.log(error.code);
            toast.error('Failed to delete post');
        }
    }
    return (
        <section className='text-center py-6'>
            <h2 className='text-3xl'>{post.title}</h2>
            <p>{post.content}</p>
            <span> Created at : {
                new Date(post.createdAt)
                    .toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })
            }</span>
            <div className=" space-x-3">
                <Link to={`/post-update/${post.id}`} state={post} className='bg-blue-500 text-white py-2 px-3 mt-3 rounded-md'>Edit </Link>
                <button onClick={deletePost} className='bg-red-500 text-white py-2 px-3 mt-3 rounded-md'>Delete </button>
            </div>
        </section>
    )
}
