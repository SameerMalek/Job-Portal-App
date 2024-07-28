import { fetchProfileAction, fetchJobsForRecruiterAction } from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function JobsPage() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  const jobsList = await fetchJobsForRecruiterAction(user?.id);
  return (
    <JobListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      jobsList= {jobsList}
    />
  );
}
