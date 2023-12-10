import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username:{
            type:String,
            requied:true,
            unique:true,
            lowecase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            requied:true,
            unique:true,
            lowecase:true,
            trim:true
            
        },
        fullname:{
            type:String,
            requied:true,
            
           
            trim:true,
            index:true
        },
        avtar:{
            type:String,
            requied:true,
           
        },
        coverImage:{
            type:String,
           
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            requied:[true,"password is requied"],

        },
        refreshToken:{
            type:string
        }

    },
    {
        timestamps:true
    }
)
userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordCorrect = async function (password)
{
    await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken = function()
{
  return  jwt.sign(
        {
            _id : this._id,
            email: this.email,
            username:this.username,
            fullname:this.fullname

        },
        ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function()
{
    return  jwt.sign(
        {
            _id : this._id,
           

        },
        REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)