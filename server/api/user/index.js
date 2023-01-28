import express from "express";

import { UserModel } from "../../database/allmodels";
import passport from "passport";
const Router = express.Router();

/*
* Router: /
* Desc: get authorised user data
* params: none
* Access: private
* Methods: GET
*/
Router.get("/", passport.authenticate("jwt", { session: false }),
    async (req, res) => {
    try {
        const { email, fullName, phoneNumber, address } = req.user;
        return res.json({ user: { email, fullName, phoneNumber, address }});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
* Router: /:_id
* Desc: get user data
* params: _id
* Access: public
* Methods: GET
*/
Router.get("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const getUser = await UserModel.findById(_id);
        
        if (!getUser) {
            return res.status(404).json({ error: "User not found by this id" });
        }
        const { fullName } = getUser;
        return res.json({ user: { fullName } });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
* Router: /:_id
* Desc: update user data by their id
* params: _id
* Access: public
* Methods: PUT
*/
Router.put("/update/:_id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { _id } = req.params;
        const { userData } = req.body;

        userData.password = undefined;

        const updateUserData = await UserModel.findById(_id, {
            $set: userData,
        }, 
        {
            new: true,
        }
        );
        return res.json({ user: updateUserData });
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;