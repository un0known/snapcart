import mongoose from 'mongoose'
import React from 'react'
interface IUser{
    _id: mongoose.Types.ObjectId
    name: string
    emial: string
    password: string
    mobile?: string
    role?: "user" | "deliveryBoy" | "admin"
    image?: string
}

function Navbar({user}: {user: IUser}) {
  return (
    <div>

    </div>
  )
}

export default Navbar