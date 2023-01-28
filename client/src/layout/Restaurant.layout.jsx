import React from "react";

//import react icon
import { TiStarOutline } from 'react-icons/ti'
import { RiDirectionLine, RiShareForwardLine } from 'react-icons/ri'
import { BiBookmarkPlus } from 'react-icons/bi'

// image for components
import Navbar from "../components/Navbar";
// import ImageGrid from "../components/Restaurant/ImageGrid";
// import InfoButton from "../components/Restaurant/InfoButton";
// import RestaurantInfo from "../components/Restaurant/RestaurantInfo";
// import Tabs from "../components/Restaurant/Tabs";
// import CartContainer from "../components/Restaurant/CartContainer";

const RestaurantLayout =
    (Component) =>
        ({ ...props }) => {
            return (
                <>
                    <Navbar/>
                    {/* <div className="container mx-auto px-4 mt-8 lg:px-20 pb=20"> */}
                        {/* <ImageGrid images= {} /> */}

                        {/* <RestaurantInfo name='' restaurantRating='' deliverRating='' cuisine='' />
            <Div className="my-4 flex flex-wrap gap-3 mx-auto">
                <InfoButton isActive='true'>
                    <TiStarOutline />
                    Add Review
                </InfoButton>
                <InfoButton>
                    <RiDirectionLine />
                    Direction
                </InfoButton>
                <InfoButton>
                    <BiBookmarkPlus />
                    Bookmark
                </InfoButton>
                <InfoButton>
                    <RiShareForwardLine />
                    Share
                </InfoButton>
            </Div>
            <Div className="my-10">
                <Tabs/>
            </Div> */}
                        <Component {...props} />
                    {/* </div> */}
                    {/* <CartContainer/> */}
                </>
    );
};

export default RestaurantLayout;