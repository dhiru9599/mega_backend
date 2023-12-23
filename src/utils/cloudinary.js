import { v2 as cloudinary} from "cloudinary";
import fs from "fs"


          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadCloudinary = async(localFilePath)=>
{
    try {
        if(!localFilePath)  return null

        //upload
       const response = await cloudinary.uploader.upload(localFilePath,
            {
                resource_type:"auto"
            })

            //successfully uploaded

            console.log("file id successfully uploaded on cloudianry",response.url);
            return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

export {cloudinary}