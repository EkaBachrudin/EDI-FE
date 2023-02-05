import { Bandge } from '@/shared/components/Bandge'
import fetcher from '@/utils/fatcher'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Router from 'next/router'
import Swal from 'sweetalert2'

import useSWR from 'swr'


export default function Detail() {

  const remove = (id:number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8000/api/blog/${id}`);
         Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        Router.push('/')
      }
    })
  }

  const router = useRouter();
  const { view } = router.query

  const { data: blog, error } = useSWR<any>(view && `http://localhost:8000/api/blog/${view}`, fetcher)

  return (
    <div className='flex justify-center'>
      <div className='lg:w-9/12'>
        <img className="h-auto max-w-full rounded-lg shadow" src={blog?.image} alt="image description"></img>
        <div className='my-5 flex justify-between'>
          <div> 
          {
            blog?.categories.map((cat: any, index: any) => (
              <Bandge key={index} category={cat.category}/>
            ))
          }
          </div>
          <div>
            <Link href={`/edit/${blog?.id}`} className="hover:underline font-extrabold">Edit this article</Link>
            <p onClick={() => remove(blog?.id)} className='text-red-600 hover:underline hover:cursor-pointer font-extrabold'>Delete This Article</p>
          </div>
          
        </div>
        <h1 className="my-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{blog?.title}</h1>
        <p className='my-5 indent-8 text-lg antialiased text-justify leading-loose'>{blog?.body}</p>
      </div>
    </div>
  )
}
