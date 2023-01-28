import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

import { ImageModel } from "../../database/allmodels";

import { s3Upload } from "../../utils/s3"

const Router = express.Router();
// configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage });
/*
* Router: /:_id
* Desc: get image based on their ids
* params: _id
* Access: public
* Methods: GET
*/
Router.get("/:_id", async (req, res) => {
    try {
        const image = await ImageModel.findById(req.params._id);
        return res.json({image})
        }catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
* Router: /
* Desc: upload given image to s3 and db
* params: none
* Access: public
* Methods: POST
*/
Router.get("/",upload.single("file"), async (req, res) => {
    try {
        const file = req.file
        const bucketOptions = {
            Bucket: "zomato-clone",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        }
        const uploadImage = await s3Upload(bucketOptions);

        // uploading images to db
        const dbUpload = await ImageModel.create({
            images: [
                {
                    location: uploadImage.Location,
                }
            ]
        })
        return res.status(200).json({ dbUpload });
        }catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;