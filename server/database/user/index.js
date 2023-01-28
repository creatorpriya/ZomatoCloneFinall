import mongoose from "mongoose";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String },
        address: [{ details: { type: String }, for: { type: String } }],
        phoneNumber: [{type:Number}],
    }, 
    {
    timestamps: true,
    });

     //attachments
UserSchema.methods.generateJmtToken = function () { 
    console.log(jwt.sign({ user: this_id.tostring() }, "zomatoApplication"));
    return jwt.sign({ user: this_id.tostring() }, "zomatoApplication");
};
    
//helper functions
UserSchema.statics.findByEmailAndPhone = async (email, phoneNumber) => {
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });

    if (checkUserByEmail || checkUserByPhone) {
        throw new Error("User Already Exists!!")
    }
    return false
};
UserSchema.statics.findByEmailAndPassword = async (email, password) => { 
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("user doesn't exist");

    //compare password
    const doesPasswordMatch = await bcrypt.compare(password, user.password)
    if (!doesPasswordMatch) throw new Error("Invalid credentials");

    return user;
};

UserSchema.pre("save", function (next) {
    const user = this;

    // passord is been modify or not??
    if (!user.isModified('password')) return next();

    // generate bcrypt and salt
    bcrypt.genSalt(8, (error, salt) => {
        if (error) return next(error);

        // hash the password for 8 times
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);
            
            // will be assinged hashed password back
            user.password = hash;
            return next();
        });
    });
});

export const UserModel = mongoose.model("users", UserSchema);