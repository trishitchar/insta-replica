'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { signIn, useSession, signOut } from 'next-auth/react';
import { FiPlusCircle } from "react-icons/fi";
import Modal from 'react-modal';
import { HiCamera } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { app } from '@/firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const Header = () => {
  const handleLogin = async () => {await signIn();};
  const handleLogout = async()=>{await signOut();}
  const {data:session} = useSession();
  const [isOpen,setIsOpen] = useState(false);//+ icon open or close
  const [selectedFile,setSelectedFile]=useState(null);//file present ache ki na
  const [imageFileUrl,setImageFileUrl]=useState(null);//oi image er take url e convert kora
  const filePickerRef = useRef(null);//file type input er sath camera button merge
  const [imageFileUploading,setImageFileUploading] = useState(false);//uploading animation
  function addImageToPost(e){
    const file = e.target.files[0];
    if(file){
        setSelectedFile(file);
        setImageFileUrl(URL.createObjectURL(file));
        console.log(imageFileUrl)
    }
  }

  useEffect(() => {
    const uploadFile = async () => {
      if (selectedFile) {
        try {
          await uploadImageToStorage();
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    };
  
    uploadFile();
  }, [selectedFile]);
  

  async function uploadImageToStorage (){
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + selectedFile.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,selectedFile);
    uploadTask.on(
        'state_changed',
        (snapshot) =>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
            console.log('upload is ' + progress + '% done')
        },
        (error)=>{
            console.log(error);
            setImageFileUploading(false);
            setImageFileUrl(null);
            setSelectedFile(null)
        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then(
                (downloadURL)=>{
                    setImageFileUrl(downloadURL);
                    setImageFileUploading(false)
                }
            )
        }
    )
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
            <div className='flex items-center justify-center'>
                <FiPlusCircle className='text-3xl cursor-pointer transform hover:scale-125 transition duration-300 hover:text-blue-500 mx-5' onClick={()=>setIsOpen(true)}/>
                <img src={session.user.image} alt={`${session.user.name}'s avatar`} className='h-10 w-10 rounded-full cursor-pointer' onClick={handleLogout}/>
            </div>
          ) : (
              <button
                className='text-sm font-semibold text-blue-500'
                aria-label='Login'
                onClick={handleLogin} 
              >
                <span>Log in</span>
              </button>
          )}
      </div>
      {
        isOpen && (
          <Modal
            isOpen={isOpen}
            className='max-w-lg w-[90%] p-6 absolute top-56 left-[50%] transform -translate-x-1/2 bg-white border-2 rounded-md shadow-md'
            onRequestClose={() => setIsOpen(false)}
            ariaHideApp={false}
          >
            <div className='flex flex-col justify-center items-center h-full'>
            {
                selectedFile ? (
                    <img src={imageFileUrl} onClick={()=>setSelectedFile(null)} alt='selected file' className={`w-full max-h-[250px] object-cover cursor-pointer ${imageFileUploading ? 'animate-pulse' :''}`}/>
                ) : (
                    <>
                        <HiCamera onClick={()=>filePickerRef.current.click()} className='text-4xl text-gray-400 cursor-pointer h-20 w-20 m-auto' />
                        <input hidden ref={filePickerRef} type='file' accept='image/*' onChange={addImageToPost}/>
                    </>
                )
            }
              <RxCross1 onClick={() => setIsOpen(false)} className='absolute cursor-pointer text-2xl font-bold top-2 right-2 hover:text-blue-500 transition duration-300 ease-in-out' />
              <input type='text' maxLength='150' className='m-4 border-none text-center w-full focus:ring-0 outline-none' placeholder='Please enter the caption' />
              <button className=' w-full text-white bg-blue-500 rounded-md p-2 shadow-md'>Upload Post</button>
            </div>
          </Modal>
        )
      }
    </header>
  );
};
export default Header;