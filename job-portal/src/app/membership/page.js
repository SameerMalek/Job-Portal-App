import { fetchProfileAction } from "@/src/actions";
import Membership from "@/src/components/membership";
import { redirect } from "next/navigation";
import { currentUser } from '@clerk/nextjs/server';

async function MembershipPage() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  if (!profileInfo) redirect("/onboard");

  return <Membership profileInfo={profileInfo} />;
}

export default MembershipPage;
