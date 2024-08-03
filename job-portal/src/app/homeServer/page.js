// src/app/HomeServer.js
import { fetchProfileAction } from "@/src/actions";
import { currentUser } from "@clerk/nextjs/server";
import HomeClient from './../homeClient/page';

export default async function HomeServer() {
  const user = await currentUser();
  const profileInfo = user ? await fetchProfileAction(user.id) : null;

  // Serialize the user and profileInfo data
  const userSerialized = user
    ? {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses?.[0]?.emailAddress, // include other necessary fields
      }
    : null;

  const profileInfoSerialized = profileInfo
    ? {
        _id: profileInfo._id,
        userId: profileInfo.userId,
        role: profileInfo.role,
        email: profileInfo.email,
        isPremiumUser: profileInfo.isPremiumUser,
        memberShipType: profileInfo.memberShipType,
        memberShipStartDate: profileInfo.memberShipStartDate,
        memberShipEndDate: profileInfo.memberShipEndDate,
        recruiterInfo: profileInfo.recruiterInfo,
        candidateInfo: profileInfo.candidateInfo,
      }
    : null;

  return (
    <HomeClient user={userSerialized} profileInfo={profileInfoSerialized} />
  );
}
