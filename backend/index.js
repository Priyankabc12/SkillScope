import dotenv from 'dotenv';
dotenv.config();

import { app } from './app.js';
import { dbConnect } from './utils/connectDb.js';



const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/health',(req,res)=>{
    res.send('Server is healthy');
})



