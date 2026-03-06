import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/Cloudinary";
import connectDb from "@/lib/db";
import Grocery from "@/models/grocery.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        await connectDb()
        const session = await auth()
        if(session?.user?.role !== "admin"){
            return NextResponse.json(
                {message: "you are not a Admin"},
                {status: 400}
            )
        }
        const fromData = await req.formData()
        const name = fromData.get("name") as string
        const category = fromData.get("category") as string
        const unit = fromData.get("unit") as string
        const price = fromData.get("price") as string
        const file = fromData.get("image") as Blob | null
        let imageURl
        if(file){
            imageURl = await uploadOnCloudinary(file)
        }
        const grocery = await Grocery.create({
            name, price, category, unit, image:imageURl
        })
        return NextResponse.json(
                grocery,
                {status: 200}
            )
    } catch (error) {
        return NextResponse.json(
                {message: `add grocery error ${error}`},
                {status: 500}
            )
    }
}