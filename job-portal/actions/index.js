"use server";

import connectToDB from "@/database";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";
import Application from './../models/application';

// create profile action:
export default async function CreateProfileAction(formData, pathToRevalidate) {
  await connectToDB(); // Connected to MongoDB
  await Profile.create(formData); // Creating profiles under the Profile collection using Profile model which uses ProfileSchema Schema...
  revalidatePath(pathToRevalidate);
}

// Fetching Profile action:

export async function fetchProfileAction(id) {
  await connectToDB();
  const result = await Profile.findOne({ userId: id });
  return JSON.parse(JSON.stringify(result));
}

// Create Job Action:

export async function postNewJobAction(formData, pathToRevalidate) {
  await connectToDB();
  await Job.create(formData);
  revalidatePath(pathToRevalidate);
}

// Fetch Job Action:
// Recruiter:

export async function fetchJobsForRecruiterAction(id) {
  await connectToDB();
  const result = await Job.find({ recruiterId: id });
  return JSON.parse(JSON.stringify(result));
}

// Candidate:

export async function fetchJobsForCandidateAction() {
  await connectToDB();
  const result = await Job.find({});
  return JSON.parse(JSON.stringify(result));
}

// Create job application

export async function createJobApplicationAction(data, pathToRevalidate) {
  await connectToDB();
  await Application.create(data);
  revalidatePath(pathToRevalidate);
}

// Fetch job applications - Candidate

export async function fetchJobApplicationsForCandidate(candidateID){
    await connectToDB();
    const result = await Application.find({candidateUserID : candidateID});
    return JSON.parse(JSON.stringify(result));
}

// Fetch job applications - Recruiter

export async function fetchJobApplicationsForRecruiter(recruiterID){
    await connectToDB();
    const result = await Application.find({recruiterUserID : recruiterID});
    return JSON.parse(JSON.stringify(result));
}

// Update job application
