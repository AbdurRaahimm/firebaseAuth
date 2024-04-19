import {collection, getDocs } from 'firebase/firestore'
import {db} from '../lib/firebase'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'))
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, ' => ', doc.data())
      setPosts((prevPosts) => [...prevPosts, doc.data()])
    })
  }
  useEffect(() => {
    getPosts()
  }, [])
  return (
    <section className='text-center py-5'>
      <div className="flex justify-between px-3 py-5">
        <h1 className='text-2xl font-bold'>Posts</h1>
        <input
          type='text'
          placeholder='Search posts'
          className='p-2 border border-gray-300 rounded-md'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />       
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {posts
          .filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
          .map((post) => (
            <div key={post.id} className='bg-gray-100 p-3 rounded-md'>
              <Link to={`post-details/${post.id}`} state={post} ><h2 className='text-xl font-bold'>{post.title}</h2></Link>
              <p>{post.content}</p>
              <span> Created at : {
              new Date(post.createdAt)
                .toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              }</span>
            </div>
          ))}
      </div>
    </section>
  )
}
