import express from "express";

import { RestaurantModel } from "../../database/allmodels";

const Router = express.Router();

/*
* Router: /
* Desc: get all the restaurant details based on the city
* params: none
* Access: public
* Methods: GET
*/
Router.get("/", async (req, res) => {
    try {
        // http://localhost:4000/restaurant/?city=hospet
        const { city } = req.query;
        const restaurant = await RestaurantModel.findById({ city });
        if (restaurants.length === 0) {
          return res.json({ error: "No restaurant found in this city" });  
        }
        return res.json({ restaurant });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
* Router: /:_id
* Desc: get individual restaurant details based on the id
* params: _id
* Access: public
* Methods: GET
*/
Router.get("/r/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const restaurant = await RestaurantModel.findById(_id);
        if (!restaurants) {
           return res.status(400).json({ error: "Restaurant Not found" }); 
        }
        return res.json({ restaurant });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
* Router: /search/:searchString
* Desc: get restaurant details based on searchString
* params: searchString
* Access: public
* Methods: GET
*/
Router.get("/search/:searchString", async (req, res) => {
    try {
        const { searchString } = req.params;
        const restaurant = await RestaurantModel.find({
            name: {$regex: searchString, $options: "i"},
        });
        if (!restaurants.length === 0) {
            return res
                .status(404)
                .json({ error: `No restaurant matched with ${searchString}` });
        }
        return res.json({ restaurant });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;
