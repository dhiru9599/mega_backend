import dotenv from 'dotenv';
import connectDB from './db/index.js';
dotenv.config({ path: './env' });

// import mongoose from 'mongoose';
// import { db_name } from './constrnts.js';


connectDB();
