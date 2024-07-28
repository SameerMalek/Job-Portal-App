import React from "react";
import Header from "../header";
import { currentUser } from "@clerk/nextjs/server";
import { fetchProfileAction } from "@/actions";

async function CommonLayout({ children }) {
  const user = await currentUser();
  const profileInfo = fetchProfileAction(user?.id);
  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
      {/* Header Component */}
      <Header
        profileInfo={profileInfo}
        user={JSON.parse(JSON.stringify(user))}
      />
      {/* Header Component */}

      {/* Main Component */}
      <main>{children}</main>
      {/* Main Component */}
    </div>
  );
}
export default CommonLayout;
