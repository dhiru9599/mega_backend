import dotenv from 'dotenv';
import connectDB from './db/index.js';
dotenv.config({ path: './env' });
import { app } from './app.js';

// import mongoose from 'mongoose';
// import { db_name } from './constrnts.js';


connectDB()
.then(()=>{
  app.listen(process.env.PORT||5000,()=>{
    console.log(`server is running on P0rt ${process.env.PORT}`);
  })
})
.catch((err)=>{
  console.log("mongodb connection failed!!!!",err);
})
