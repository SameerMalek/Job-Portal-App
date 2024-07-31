import {
  fetchProfileAction,
  fetchJobsForRecruiterAction,
  fetchJobsForCandidateAction,
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecruiter,
  createFilterCategoryAction,
} from "@/src/actions";
import JobListing from "@/src/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function JobsPage({searchParams}) {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  const getJobApplicationList =
    profileInfo?.role === "candidate"
      ? await fetchJobApplicationsForCandidate(user?.id)
      : await fetchJobApplicationsForRecruiter(user?.id);

  const jobsList =
    profileInfo?.role === "candidate"
      ? await fetchJobsForCandidateAction(searchParams)
      : await fetchJobsForRecruiterAction(user?.id);

  const fetchFilterCategories = await createFilterCategoryAction();

  return (
    <JobListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      jobsList={jobsList}
      jobApplications={getJobApplicationList}
      filterCategories={fetchFilterCategories}
    />
  );
}
