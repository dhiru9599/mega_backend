import mongoose from "mongoose";
import { db_name } from "../constrnts.js";

const connectDB = async()=>
{
    try {
      const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`)
      console.log(`\n mongodb connected!! dbHost: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("DB connection erron",error);
        process.exit(1)
    }

}

export default connectDB;