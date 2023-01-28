import express from "express";

import { FoodModel } from "../../database/allmodels";

const Router = express.Router();

/*
* Router: /:_id
* Desc: get food based on id
* params: _id
* Access: public
* Methods: GET
*/
Router.get("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const food = FoodModel.findById(_id);
        return res.json({ food });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
* Router: /r/:_id
* Desc: get food based on particular restaurant
* params: _id
* Access: public
* Methods: GET
*/
Router.get("/r/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const food = FoodModel.find({
            restaurant: _id,
        });
        return res.json({ food });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
* Router: /c/category
* Desc: get food based on particular category
* params: category
* Access: public
* Methods: GET
*/
Router.get("/c/:category", async (req, res) => {
    try {
        const { category } = req.params;
        const food = await FoodModel.find({
            category: {$regex: category, $options: "i"},
        });
        if (!food) {
            return res
                .status(404)
                .json({ error: `No food matched with ${category}` });
        }
        return res.json({ food });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;
