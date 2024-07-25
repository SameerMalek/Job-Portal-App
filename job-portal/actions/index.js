"use server"

import connectToDB from "@/database"
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

// create profile action:
export default async function CreateProfile(formData, pathToRevalidate) {
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
