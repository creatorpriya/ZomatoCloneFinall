import express from "express";
import passport from "passport";
import { ReviewModel } from "../../database/allmodels";

const Router = express.Router();

/*
* Router: /:resId
* Desc: get all the review for particular restaurant id
* params: resId
* Access: public
* Methods: GET
*/
Router.get("/:resId", async (req, res) => {
    try {
        const { resId } = req.params;
        const reviews = await ReviewModel.find({ restaurants: resId }).sort({
            createdAt: -1
        })
        return res.json({ reviews });
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
* Router: /new
* Desc: add new food/restaurant review and rating 
* params: none
* Access: private
* Methods: POST
*/
Router.post("/new",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { _id } = req.user;
            const { reviewData } = req.body;
            const newReview = await ReviewModel.create(
                {
                    ...reviewData,
                    user: _id
                }
             );
        return req.json({ newReview });  
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
    });

/*
* Router: /delete/:id
* Desc: delete a review  
* params: none
* Access: private
* Methods: DELETE
*/
Router.delete("/delete/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { user } = req;
            const { id } = req.params;
            const data = await ReviewModel.findOneAndDelete(
                {
                    _id: id,
                    user: user._id
                }
            );
            if(data) return res.json({message: "review was not deleted" });
        return req.json({message: "successfully delete a review", data });  
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;