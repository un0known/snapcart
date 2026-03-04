'use client'
import { LogOut, Package, Search, ShoppingCart, User } from 'lucide-react'
import mongoose from 'mongoose'
import { AnimatePresence, motion } from 'motion/react'
import { div } from 'motion/react-client'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
interface IUser {
  _id: mongoose.Types.ObjectId
  name: string
  emial: string
  password: string
  mobile?: string
  role?: "user" | "deliveryBoy" | "admin"
  image?: string
}

function Navbar({ user }: { user: IUser }) {

  const [dropDown, setDropDown] = useState(false)
  const profileDropDown = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    const handleClickOutside = (e:MouseEvent)=>{
      if(profileDropDown.current && !profileDropDown.current.contains(e.target as Node)){
        setDropDown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return ()=> document.removeEventListener("mousedown", handleClickOutside)

  }, [])

  return (
    <div className='w-[95%] fixed top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-green-500
    to-green-700 rounded-2xl shadow-lg shadow-black/30 flex justify-between items-center h-20 px-4
    md:px-8 z-50'>

      {/* navbar left side  */}
      <Link href={"/"}
        className='text-white font-extrabold text-2xl sm:text-3xl tracking-wide hover:scale-105 transition-transform'>
        Snapcart
      </Link>

      {/* navbar center {search box} */}
      <form className='hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md' >
        <Search className='text-gray-500 w-5 h-5 mr-2' />
        <input type="text" placeholder='Search groceries...'
          className='w-full outline-none text-gray-700 placeholder-gray-400' />
      </form>


      {/* navbar right side {PROFILE & CART} */}

      <div className='flex items-center gap-3 md:gap-6 relative'>

        {/* CART */}
        <Link href={""}
          className='relative bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-105 transition'>
          <ShoppingCart className='text-green-600 w-6 h-6' />
          <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center
        justify-center rounded-full font-semibold shadow'>0</span>
        </Link>

        {/* PROFILE */}
        <div className='relative' ref={profileDropDown}>

          {/* profile image and dropdown button */}
          <div className='bg-white rounded-full w-11 h-11 flex items-center justify-center overflow-hidden shadow-md hover:scale-105
        transition-transform'
            onClick={() => setDropDown(prev => !prev)}
          >
            {user.image
              ? <Image src={user.image} alt='icon' fill className='object-cover rounded-full' />
              : <User />}
          </div>

          {/* Dropdown menu */}
          <AnimatePresence>
            {dropDown && <motion.div
            initial={{opacity:0, y: -10, scale:0.95 }}
            animate={{opacity:1, y: 0, scale:1}}
            transition={{duration:0.4}}
            exit={{opacity: 0, y: -10, scale: 0.95}}
            className='absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 z-999'
            >
              {/* DropDown content */}
              <div className='flex items-center gap-3 px-3 py-2 border-b border-gray-100'>
                {/* image */}
                <div className='w-10 h-10 rounded-full bg-green-100 flex items-center justify-center overflow-hidden relative'>
                  {user.image ? <Image src={user.image} alt='user' fill className='object-cover rounded-full' /> : <User />}
                </div>
                {/* user details */}
                <div>
                  <div className='text-gray-800 font-semibold'>{user.name}</div>
                  <div className='text-xs text-gray-500 capitalize'>{user.role}</div>
                </div>
              </div>

              {/* my orders */}
              <Link href={""}
              onClick={()=>setDropDown(false)}
              className='flex items-center gap-2 px-3 py-3 hover:bg-green-50 rounded-lg text-gray-700 font-medium'>
                <Package className='w-5 h-5 text-green-600' />
                My Orders
              </Link>

              {/* Log Out Button */}
              <button 
              onClick={()=>{setDropDown(false)
                 signOut({callbackUrl: "/login"})}}
              className='flex items-center w-full gap-2 px-3 py-3 hover:bg-red-50 rounded-lg text-gray-700 font-medium'>
                <LogOut className='w-5 h-5 text-red-600' />
                Log Out 
              </button>

            </motion.div>}

          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Navbar