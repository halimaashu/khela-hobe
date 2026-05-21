import { NextResponse } from 'next/server'
import { getUserData } from './lib/getUserData'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {

  const user=await getUserData();

if(!user){
return NextResponse.redirect(new URL('/login', request.url))
}
  
}
 
export const config = {
  matcher: ['/bookings','/all-facility/:path*',"/all-facility"],
}