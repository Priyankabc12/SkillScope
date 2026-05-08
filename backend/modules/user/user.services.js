import { convertIndexToString } from "drizzle-orm/mysql-core";
import { jobs } from "../../schemas/jobs.schema.js"
import { userTable } from "../../schemas/user.schema.js"
import { dbConnect } from "../../utils/connectDb.js";
import { eq } from "drizzle-orm";
export const getJobsByUserId = async (userId) => {
    try{
        const db = await dbConnect();
        const userJobs = await db.select().from(jobs).where(eq(jobs.userId, userId));
        return userJobs;
    }catch(err){
        console.log(err);
        throw new Error("Failed to fetch user jobs");
    }
}

export const getUserProfile = async (userId) => {
    try{
        const db = await dbConnect();
        const userProfile = await db.select().from(userTable).where(eq(userTable.id, userId)).limit(1);

        if(!userProfile || userProfile.length === 0){
            throw new Error("User not found");
        }

        return userProfile[0];
    }catch(err){
        console.log(err);
        throw new Error("Failed to fetch user profile");
        
    }
}

export const updateUserJobs = async (userId, jobData)=>{
    try{
        const db = await dbConnect();
        const existingJobs = await db.select().from(jobs).where(
         eq(jobs.apply_url, jobData.apply_url)
        );

        if(existingJobs.length > 0){
            return existingJobs;
        }

        await db.insert(jobs).values({
            ...jobData,
            userId: userId
        });

        return true;

    }catch(err){
        console.log(err);
        throw new Error("Failed to update user jobs");

    }
}