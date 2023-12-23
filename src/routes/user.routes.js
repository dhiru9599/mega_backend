import { Router } from "express";
import { registerUser } from "../controllers/user.contollers.js";

import upload from "../middlewares/mullter.middlewares.js"

const router = Router();
router.route("/register").post(
   upload.fields([
    {
        name:"avtar",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
   ]) 
    ,registerUser)





export default router;