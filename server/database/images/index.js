import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
    {
        Images: [
            {
              location : {type:String, required: true}
            }
      ]  
    }, 
    {
    timestamps: true,
});

export const ImageModel = mongoose.model("Images", ImageSchema);
