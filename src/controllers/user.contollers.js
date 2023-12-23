import {asyncHandler} from "../utils/asyncHandler.js"
import {apiError} from "../utils/ApiError"
import {uploadCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async(req,res)=>{
 
    const {fullname,email,password,username} = req.body
    console.log("Email:",email);
    console.log("pass",password);
    if ([fullname,email,password,username].some((field)=>field?.trim === ""
    
        
    )) {
        throw new apiError(400,"all fields are requied")
        
    }
    const existedUser = User.findOne({
        $or:[{username},{email}]
    })
    if (existedUser) {
        throw new apiError(409,"user already exists")
    }
    const avtarLocalPath = req.files?.avtar[0]?.path;
    const avtarCoverImageLoacalPath = req.files?.coverImage[0]?.path;
    if(!avtarLocalPath)
    {
        throw new apiError(400,"Avtar file is requied")
    } 
    const avatar = await uploadCloudinary(avtarLocalPath)
    const coverImage = await uploadCloudinary(avtarCoverImageLoacalPath)
    if(!avatar)
    {
        throw new apiError(400,"Avtar file is requied")
    }
   const user = await username.create(
        {
            fullname,
            avatar:avatar.url,
            coverImage:coverImage?.url||"",
            email,
            password,
            username:username.toLowerCase()
        }
    )
    const createdUser = await user.findById(user._id).select("-password -refreshToken")
    if(!createdUser)
    {
        throw new apiError(500,"something went wrong while registering the user")
    }

})
return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successfully")
)

export {registerUser}

