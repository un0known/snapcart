import { ArrowLeft, Leaf } from 'lucide-react'
import { motion } from "motion/react"
import React from 'react'

type propType={
    previousStep:(s:number)=>void
}

function RegisterForm({previousStep}: propType) {
  return (
    <div className='flex, flex-col items-center justify-center min-h-screen px-6 py-6 bg-white relative'>
        <div className=' absolute flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors cursor-pointer'
        onClick={()=>previousStep(1)}
        >
            <ArrowLeft className='w-5 h-5' />
            <span className='font-medium'>Back</span>
        </div>

        <motion.h1
        initial={{ y:-10, opacity:0 }}
        animate={{ y:0, opacity:1}}
        transition={{duration:0.6}}
        className='text-4xl font-extrabold text-green-700 mb-2'
        >
            Create Account
        </motion.h1>
        <p>
            join snapcart today <Leaf className='w-5 h-5 text-green-600' />
        </p>
        <motion.form action=""
        className='flex '
        >

        </motion.form>

    </div>
  )
}

export default RegisterForm