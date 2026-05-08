import { getJobsByUserId ,getUserProfile,updateUserJobs} from "./user.services.js";


export const getUserJobsController = async(req,res)=>{
    try{
        const userId = req.query.userId;

        const jobs = await getJobsByUserId(userId);
        return res.status(200).json(jobs);
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error"});
    }
}

export const getUserProfileController = async(req,res)=>{
    try{
        const userId = req.query.userId;
        const userProfile = await getUserProfile(userId);
        return res.status(200).json(userProfile);
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error"});
    }
}

export const updateUserJobsController = async(req,res)=>{
    try{
        const userId = req.body.userId;
        const job = req.body.job;

        await updateUserJobs(userId, job);
        return res.status(200).json({message:"User jobs updated successfully"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error"});
    }
}