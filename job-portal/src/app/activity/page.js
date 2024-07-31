import {
    fetchJobApplicationsForCandidate,
    fetchJobsForCandidateAction,
  } from "@/src/actions";
  import CandidateActivity from "@/src/components/candidate-activity";
  import { currentUser } from '@clerk/nextjs/server';

  export default async function Activity() {
    const user = await currentUser();
    const jobList = await fetchJobsForCandidateAction();
    const jobApplicants = await fetchJobApplicationsForCandidate(user?.id);
  
    return <CandidateActivity jobList={jobList} jobApplicants={jobApplicants} />;
  }