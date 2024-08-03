// src/app/HomeClient.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HomepageButtonControls from "@/src/components/homepage-button-controls";

export default function HomeClient({ user, profileInfo }) {
  const router = useRouter();

  useEffect(() => {
    if (user && !profileInfo?._id) {
      router.push("/onboard");
    }
  }, [user, profileInfo, router]);

  if (!user || !profileInfo) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative w-full h-full min-h-screen pb-10">
      <div className="w-full h-full relative">
        <div className="flex flex-col-reverse lg:flex-row gap-10 mt-16">
          <section className="w-full lg:w-[50%] flex flex-col md:px-2 lg:px-0 p-5 lg:p-10">
            <div className="w-full flex justify-start flex-col h-auto ">
              <span className="flex space-x-2">
                <span className="block w-14 mb-2 dark:border-white border-b-2 border-gray-700"></span>
                <span className="font-medium dark:text-white text-gray-600">
                  The Ultimate Solution for Job Searching
                </span>
              </span>
              <h1 className="text-3xl dark:text-white mt-5 lg:text-7xl text-black font-extrabold">
                Create the ultimate job community beginning right here.
              </h1>
              <div className="w-full mt-6 flex items-center text-white justify-start gap-2">
                <HomepageButtonControls
                  user={user}
                  profileInfo={profileInfo}
                />
              </div>
            </div>
          </section>
          <section className="relative w-full lg:w-[50%] flex items-center justify-end">
            <img
              src="https://utfs.io/f/4c9f7186-8ad0-4680-aece-a5abea608705-k6t10e.png"
              alt="Hero"
              className="h-full w-full object-contain z-10"
            />
          </section>
        </div>
      </div>
    </section>
  );
}
