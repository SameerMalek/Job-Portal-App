import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import CommonLayout from "@/src/components/common-layout";
import {
  ClerkProvider
} from '@clerk/nextjs'
import { Toaster } from "@/src/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Job-Portal App",
  description: "Get Hired on One Click!",
};

export default function RootLayout({ children }) {
  return (
   <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
     <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading/>}>
        <CommonLayout children={children}/>
        </Suspense>
        <Toaster/>
      </body>
    </html> 
   </ClerkProvider>
  );
}
