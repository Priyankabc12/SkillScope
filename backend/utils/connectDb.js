import { drizzle } from 'drizzle-orm/neon-http';

export const dbConnect = async()=>{
    try{
        const db = drizzle(process.env.DATABASE_URL);
        return db;
    }
    catch(err){

        console.log(err);
        process.exit(1);
    }
}