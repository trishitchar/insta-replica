import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='shadow-sm border-b sticky top-0 bg-white z-30 p-3'>
      <div className='flex justify-between items-center max-w-6xl mx-auto'>
        {/* Logo */}
        <Link href="/" className='hidden lg:inline-flex'>
          <Image
            src="/Instagram_logo_black.webp"
            width={96}
            height={96}
            alt="Instagram logo"
          />
        </Link>
        <Link href="/" className='lg:hidden'>
          <Image
            src="/800px-Instagram_logo_2016.webp"
            width={40}
            height={40}
            alt="Instagram logo"
          />
        </Link>

        {/* Search */}
        <input
          type='text'
          placeholder='Search for users or hashtags'
          className='bg-gray-50 border border-gray-200 rounded-sm text-sm w-full py-2 px-4 max-w-[230px]'
        />

        {/* Menu Item */}
        <button
          className='text-sm font-semibold text-blue-500'
          aria-label='Login'
        >
          <span>Log in</span>
        </button>
      </div>
    </header>
  )
}

export default Header