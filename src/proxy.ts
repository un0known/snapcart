import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest){

    const {pathname} = req.nextUrl
    // console.log("this is pathname", pathname)
    const publicRouts = ["/login", "/register", "/api/auth"]

    // access publicRouts CODE
    if(publicRouts.some((path)=>pathname.startsWith(path))){
        return NextResponse.next()
    }

    const token = await getToken({req, secret:process.env.AUTH_SECRET})
    console.log("token", token)
    console.log("req.url", req.url)
    if(!token){
        const loginUrl = new URL("/login", req.url)
        loginUrl.searchParams.set("callbackUrl", req.url)
        console.log("logIn Url",loginUrl)
        return NextResponse.redirect(loginUrl)
    }


    const role = token.role
    if(pathname.startsWith("/user") && role !== "user"){
        return NextResponse.redirect(new URL("/unauthorized", req.url))
    }
    if(pathname.startsWith("/delivery") && role !== "deliveryBoy"){
        return NextResponse.redirect(new URL("/unauthorized", req.url))
    }
    if(pathname.startsWith("/admin") && role !== "admin"){
        return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    
    return NextResponse.next()
}

export const config ={
    matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
}

// req------------middleware(proxy)---------------server
// loIn , register, api, auth {everyone can access}
