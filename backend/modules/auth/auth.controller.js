import { signUp,signIn } from "./auth.services.js";

export const signUpController = async(req,res)=>{
    try{
        const user = await signUp(req.body);
        return res.status(201).json(user);
    }catch(err){
        return res.status(400).json({message:err.message});

    }
}

export const signInController = async(req,res)=>{
    try{
        const user = await signIn(req.body);
        return res.status(200).json(user);
    }catch(err){
        console.log(err);
        return res.status(400).json({message:err.message});

    }
}
