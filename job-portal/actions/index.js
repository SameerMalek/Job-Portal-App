"use server"

import connectToDB from "@/database"
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

// create profile action:
export default async function CreateProfileAction(formData, pathToRevalidate) {
 await connectToDB(); // Connected to MongoDB
 await Profile.create(formData); // Creating profiles under the Profile collection using Profile model which uses ProfileSchema Schema...
 revalidatePath(pathToRevalidate);
}

// Fetching Profile action:

export async function fetchProfileAction(id){
    await connectToDB();
    const result = await Profile.findOne({userId: id});
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
    const result = await Job.find({recruiterId: id});
    return JSON.parse(JSON.stringify(result));
 }
 

// Candidate:

