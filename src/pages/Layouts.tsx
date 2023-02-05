import { Header } from '@/shared/components/Header'
import React, { PropsWithChildren } from 'react'
import 'flowbite'

export default function Layout({children}:PropsWithChildren) {
  return (
    <>
      <div className=''>
      <Header/>
        <main className='m-auto min-h-screen p-10'>
            {children}
        </main>
        <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© Eka bachrudin. All Rights Reserved.
            </span>
      </footer>
      </div>
    </>
  )
}
