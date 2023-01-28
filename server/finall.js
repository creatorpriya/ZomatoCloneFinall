import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import  session  from "express-session";
import privateRouteConfig from "./config/router.config";
import googleAuthConfig from "./config/google.config";

//database connection
import connectDB from './database/connections';

import Auth from './api/auth';
import Food from './api/food';
import Restaurant from './api/restaurant';
import User from './api/user'; 
import Menu from "./api/menu";
import Order from "./api/order";
import Review from "./api/review";
import Image from "./api/image";

dotenv.config();

privateRouteConfig(passport);
googleAuthConfig(passport);

const zomato = express();

zomato.use(express.json());
zomato.use(session({ secret: "zomatoApp" }));
zomato.use(passport.initialize());
zomato.use(passport.session());
zomato.get("/", (req, res) => {
  res.json({
    message: "server is running.."
  });
});

// /auth/signup
zomato.use("/auth", Auth);
zomato.use("/food", Food);
zomato.use("/restaurant", Restaurant);
zomato.use("/user", User);
zomato.use("/menu", Menu);
zomato.use("/order", Order);
zomato.use("/review", Review);
zomato.use("/image", Image);

const PORT = 4000;
zomato.listen(PORT, () => {
  connectDB()
      .then(() => {
          console.log("server is  running!!");
      })
      .catch((error) => {
          console.log("server is running, but database connection failed");
          console.log(error);
      })
  //console.log("server is running!!");
});



