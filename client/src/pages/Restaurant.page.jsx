import React from "react";
import { Outlet } from "react-router-dom";

//layouts
import RestaurantLayout from "../layout/Restaurant.layout";

const Restaurant = () => {
    return <>
        <h4>This is Restaurant page</h4>
    <Outlet/>
    </>
    
};

export default RestaurantLayout(Restaurant);