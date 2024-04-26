'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { signIn,useSession, signOut } from 'next-auth/react';

const Header = () => {

  const handleLogin = async () => {
    await signIn();
  };

  const {data:session} = useSession();
  console.log(session)

  const handleLogout = async()=>{
    await signOut();
  }
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
          {session ? (
            <img src={session.user.image} alt='session.user.name' className='h-10 w-10 rounded-full cursor-pointer' onClick={handleLogout}/>
          ) : (
              <button
                className='text-sm font-semibold text-blue-500'
                aria-label='Login'
                onClick={handleLogin} 
              >
                <span>Log in</span>
              </button>
          )
          
      }
      </div>
    </header>
  );
};
export default Header;