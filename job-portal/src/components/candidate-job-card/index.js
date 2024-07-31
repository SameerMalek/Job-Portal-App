"use client";

import React, { Fragment, useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { createJobApplicationAction } from "@/src/actions";
import { useToast } from "../ui/use-toast";

export default function CandidateJobCard({
  jobitem,
  profileInfo,
  jobApplications,
}) {
  const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);
  const { toast } = useToast();

  async function handleJobApply() {
    if (!profileInfo?.isPremiumUser && jobApplications.length >= 2) {
      setShowJobDetailsDrawer(false);
      toast({
        variant: "destructive",
        title: "You can apply max 2 jobs.",
        description: "Please opt for membership to apply for more jobs",
      });
      return;
    }
    await createJobApplicationAction(
      {
        recruiterUserID: jobitem?.recruiterId,
        name: profileInfo?.candidateInfo?.name,
        email: profileInfo?.email,
        candidateUserID: profileInfo?.userId,
        status: ["Applied"],
        jobID: jobitem?._id,
        jobAppliedDate: new Date().toLocaleDateString(),
      },
      "/jobs"
    );
    setShowJobDetailsDrawer(false);
  }
  return (
    <Fragment>
      <Drawer
        open={showJobDetailsDrawer}
        onOpenChange={setShowJobDetailsDrawer}
      >
        <CommonCard
          icon={<JobIcon />}
          title={jobitem?.title}
          description={jobitem?.companyName}
          footerContent={
            <Button
              onClick={() => setShowJobDetailsDrawer(true)}
              className="flex h-11 items-center justify-center px-5"
            >
              View Details
            </Button>
          }
        />
        <DrawerContent className="p-6">
          <DrawerHeader className={"px-0"}>
            <div className="flex justify-between">
              <DrawerTitle className="text-4xl font-extrabold text-gray-800">
                {jobitem?.title}
              </DrawerTitle>
              <div className="flex gap-3">
                <Button
                  onClick={handleJobApply}
                  className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
                  disabled={
                    jobApplications.findIndex(
                      (item) => item.jobID === jobitem?._id
                    ) > -1
                      ? true
                      : false
                  }
                >
                  {jobApplications.findIndex(
                    (item) => item.jobID === jobitem?._id
                  ) > -1
                    ? "Applied"
                    : "Apply"}
                </Button>
                <Button
                  className="flex h-11 items-center justify-center px-5"
                  onClick={() => setShowJobDetailsDrawer(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DrawerHeader>
          <DrawerDescription className="text-2xl font-medium text-gray-600">
            {jobitem?.description}
            <span className="text-xl ml-4 font-normal text-gray-500">
              {jobitem?.location}
            </span>
          </DrawerDescription>
          <div className="w-[150px] mt-6 flex justify-center items-center h-[40px] bg-black rounded-[4px]">
            <h2 className="text-xl font-bold text-white">{jobitem?.type}</h2>
          </div>
          <h3 className="text-2xl font-medium text-black mt-3">
            Experience: {jobitem?.experience} year
          </h3>
          <div className="flex gap-4 mt-6">
            {jobitem?.skills.split(",").map((skillitem,id) => (
              <div key={id} className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                <h2 className="text-[13px] font-medium text-white">
                  {skillitem}
                </h2>
              </div>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
