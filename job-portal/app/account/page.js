import { fetchProfileAction } from "@/actions";
import AccountInfo from "@/components/account-info";
import { redirect } from "next/navigation";
import { currentUser } from '@clerk/nextjs/server';

async function AccountPage() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  if (!profileInfo) redirect("/onboard");
  return <AccountInfo profileInfo={profileInfo} />;
}

export default AccountPage;