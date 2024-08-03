"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect } from "react";

function HomepageButtonControls({ user, profileInfo }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  const handleJobButtonClick = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      router.push("/jobs");
    }
  };

  const handlePostButtonClick = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      const destination =
        profileInfo?.role === "candidate" ? "/activity" : "/jobs";
      router.push(destination);
    }
  };

  return (
    <div className="flex space-x-4">
      <Button
        onClick={handleJobButtonClick}
        className="flex h-11 items-center justify-center px-5"
      >
        {user
          ? profileInfo?.role === "candidate"
            ? "Browse Jobs"
            : "Jobs Dashboard"
          : "Find Jobs"}
      </Button>
      <Button
        onClick={handlePostButtonClick}
        className="flex h-11 items-center justify-center px-5"
      >
        {user
          ? profileInfo?.role === "candidate"
            ? "Your Activity"
            : "Post New Job"
          : "Post New Job"}
      </Button>
    </div>
  );
}

export default HomepageButtonControls;
