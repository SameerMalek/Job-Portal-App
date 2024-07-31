import { fetchProfileAction } from "@/src/actions";
import OnBoard from "@/src/components/on-board";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function OnBoardPage() {
  // Get auth user from clerk:
  const user = await currentUser();

  // fetch the Profile info: either user is candidate or user is recruiter
  const profileInfo = await fetchProfileAction(user?.id);
  if (profileInfo?._id) {
    if (profileInfo?.role === "recruiter" && !profileInfo.isPremiumUser) {
      redirect("/membership");
    } else redirect("/");
  } else return <OnBoard />;
}
