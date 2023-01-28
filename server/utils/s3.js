import AWS from "aws-sdk";
import dotenv from "dotenv";
import { date, options } from "joi";

dotenv.config();

const s3Bucket = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    region: "ap-south-1",
});

export const s3Upload = (options) => {
    return new Promise( ( resolve, reject ) =>
        s3Bucket.upload(options, (error, date) => {
            if (error) return reject(error);
            return resolve(date);
        })
    )
}