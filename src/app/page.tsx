import { auth } from "@/auth";
import EditRoleMobile from "@/components/EditRoleMobile";
import Navbar from "@/components/Navbar";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { redirect } from "next/navigation";


export default async function Home() {

  await connectDb()
  const session = await auth()
  const user = await User.findById(session?.user?.id)
  if(!user){
    redirect("/login")
  }

  const inComplete = !user.mobile || !user.role || (!user.mobile && user.role == "user")
  if(inComplete){
    return <EditRoleMobile />
  }

  const plainUser = JSON.parse(JSON.stringify(user))
  // console.log("this is plainuser",plainUser)
  // console.log("this is user",user)

  return (
    <>
    <Navbar user={plainUser}/>
    </>
  );
}
