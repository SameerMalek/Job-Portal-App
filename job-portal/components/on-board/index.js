"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import CommonForm from "../common-form";
import {
  candidateOnboardFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnboardFormControls,
} from "./../../../utils/index";
import { useUser } from "@clerk/clerk-react";
import CreateProfile from "@/actions";

export default function OnBoard() {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );
  const handleTabChange = (value) => {
    setCurrentTab(value);
  };
  const handleRecruiterFormValidation = () => {
    return (
      recruiterFormData &&
      recruiterFormData.name.trim() !== "" &&
      recruiterFormData.companyName.trim() !== "" &&
      recruiterFormData.companyRole.trim() !== ""
    );
  };

  //Getting user info like userId and Email address:
  const currentAuthUser = useUser();
  const {user} = currentAuthUser;
  console.log(currentAuthUser);

  async function createProfileAction(){
    const data = {
      recruiterInfo : recruiterFormData,
      role : "recruiter",
      isPremiumUser : false,
      userId: user?.id,
      email : user?.primaryEmailAddress?.emailAddress
    };
    await CreateProfile(data, '/onboard')
  }

  console.log(recruiterFormData);
  return (
    <div className="bg-white">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="w-full">
          <div className="flex items-baseline justify-between border-b pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Welcome to Onboarding
            </h1>
            <TabsList>
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="recruiter">
          <CommonForm
            formControls={recruiterOnboardFormControls}
            buttonText={"On board as Recruiter!"}
            formData={recruiterFormData}
            setFormData={setRecruiterFormData}
            isBtnDisabled={!handleRecruiterFormValidation()}
            action={createProfileAction}
          />
        </TabsContent>
        <TabsContent value="candidate">
          <CommonForm
            formControls={candidateOnboardFormControls}
            buttonText={"On board as Candidate"}
            formData={candidateFormData}
            setFormData={setCandidateFormData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
