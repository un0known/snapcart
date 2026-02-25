import mongoose from "mongoose";

interface Iuser{
    _id?: mongoose.Types.ObjectId
    name: string
    email: string
    password: string
    mobile?: string
    role: "user" | "admin" | "deliveryBoy"
}

const userSchema = new mongoose.Schema<Iuser>({
    name:{
        type: String
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        
    },
    role:{
        type: String,
        enum:["user", "admin", "deliveryBoy"],
        default:"user"
    }
},{timestamps: true})

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User


// unknownnperson8_db_user
// BrqVyDFMgz75IyDH
// mongodb+srv://unknownnperson8_db_user:BrqVyDFMgz75IyDH@cluster0.ceabj2u.mongodb.net/