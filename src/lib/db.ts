import mongoose from "mongoose";

const mongodbUrl= process.env.MONGODB_URL

if(!mongodbUrl){
    throw new Error("db error")
}

let cached = global.mongoose
if(!cached){
    cached = global.mongoose={connect:null, promise:null}
}

const connectDb = async ()=>{
    if(cached.connect){
        return cached.connect
    }
    if(!cached.promise){
        cached.promise = mongoose.connect(mongodbUrl).then( (connect) => connect.connection)
    }
    try {
        const connect = await cached.promise
        return connect
    } catch (error){

    }
}