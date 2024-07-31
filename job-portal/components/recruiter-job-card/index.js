"use client";

import { useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import JobApplicant from "../job-applicants";

export default function RecruiterJobCard({ jobitem, jobApplications }) {
  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
  const [
    showCurrentCandidateDetailsModal,
    setShowCurrentCandidateDetailsModal,
  ] = useState(false);

  return (
    <div>
      <CommonCard
        icon={<JobIcon />}
        title={jobitem.title}
        footerContent={
          <Button
            onClick={() => setShowApplicantsDrawer(true)}
            disabled={
              jobApplications.filter((item) => item.jobID === jobitem?._id)
              .length === 0
            }
            className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
          >
            {
              jobApplications.filter((item) => item.jobID === jobitem?._id)
                .length
            }
            Applicants
          </Button>
        }
      />
      <JobApplicant
        showApplicantsDrawer={showApplicantsDrawer}
        setShowApplicantsDrawer={setShowApplicantsDrawer}
        showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
        setShowCurrentCandidateDetailsModal={
          setShowCurrentCandidateDetailsModal
        }
        currentCandidateDetails={currentCandidateDetails}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        jobitem={jobitem}
        jobApplications={jobApplications.filter(
          (jobApplicantItem) => jobApplicantItem.jobID === jobitem?._id
        )}
      />
    </div>
  );
}
