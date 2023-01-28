import express from "express";
import passport from "passport";
import { orderModel } from "../../database/order";

const Router = express.Router();

/*
* Router: /
* Desc: get all the order by user id
* params: none
* Access: private
* Methods: GET
*/
Router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { user } = req.user;
        const getOrders = await orderModel.findOne({ user: user._id });
        if (!getOrders) 
            return res
                .status(400)
                .json({ error: "No order for this user found here" })
        
        return res.status(200).json({ orders: getOrders });
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
* Router: /new
* Desc: add new order 
* params: none
* Access: private
* Methods: PUT
*/
Router.get("/new",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
    try {
        const { user } = req;
        const { orderDetails } = req.body;
        const addNewOrder = await orderModel.findByIdAndUpdate(
            {
            user: user._id,
            },
            {
                $push: {
                orderDetails: orderDetails,
            },
            }, {
                new:true,
            }
        );
        return req.json({ order: addNewOrder });  
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;