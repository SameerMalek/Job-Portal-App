import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(
 { publicRoutes:['/']} // Non-users can also see this route.
//  { publicRoutes:['/','/onboard']} // Here, onboard route can also be accessed by any one without loggin in.
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};