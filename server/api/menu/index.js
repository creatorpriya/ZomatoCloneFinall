import express from "express";

const Router = express.Router();

/*
* Router: /list/:_id
* Desc: get all the list of menu based on restaurant id
* params: _id
* Access: public
* Methods: GET
*/
Router.get("/list/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const menu = await MenuModel.findById(_id);
        if (!menu) {
            return res
                .status(404)
                .json({ error: "No menu present for this restaurant" })
        }
        return res.json({ menu });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
* Router: /image
* Desc: get all the menu images based on their restaurant id
* params: _id
* Access: public
* Methods: GET
*/
Router.get("/image/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const menuImages = await ImageModel.findById(_id);
        if (!menuImages) {
            return res
                .status(404)
                .json({ error: "No menu Image found here" });
        }
        return res.json({ menuImages });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;