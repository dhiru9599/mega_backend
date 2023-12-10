import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
videoFile:{
    requied:true,
    type:string
},
thumbnail:{
    requied:true,
    type:string
},
title:{
    requied:true,
    type:string
},
description:{
    requied:true,
    type:string
},
duration:{
    requied:true,
    type:Number
},
views:{
    type:Number,
    default:0
},
isPublished:{
    type:Boolean,
    default:true
},
owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
}

},
{
    timestamps:true
})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema)