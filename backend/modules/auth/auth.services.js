import { userTable } from "../../schemas/user.schema.js"
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { dbConnect } from "../../utils/connectDb.js";



export const signUp = async({email,password,name})=>{
    try{
        const db = await dbConnect();

        const existingUser = await db
            .select()
            .from(userTable)
            .where(eq(userTable.email, email))
            .limit(1);


        if(existingUser.length > 0){
            throw new Error("User already exists");
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.insert(userTable).values({
            email:email,
            password:hashedPassword,
            name:name
        }).returning();

        return newUser;

    }catch(err){
        console.log(err);
        throw err;
    }
}


export const signIn = async({email,password})=>{
    try{
        const db = await dbConnect();

        const user = await db
            .select()
            .from(userTable)
            .where(eq(userTable.email, email))
            .limit(1);

        if(!user || user.length === 0){
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if(!isPasswordValid){
            throw new Error("Invalid password");
        }

        return user;
    }catch(err){
        console.log(err);
        throw err;
    }
}

