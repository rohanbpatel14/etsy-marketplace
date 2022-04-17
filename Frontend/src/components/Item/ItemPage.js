import React, { lazy, useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import EuroIcon from "@mui/icons-material/Euro";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Button, ImageListItem, ImageListItemBar } from "@mui/material";
import { getItemData } from "../../service/itemService";
import { fetchShopData } from "../../service/shopService";
import { backend } from "../../config/backend";
// import Favourite from "";

const ItemPage = () => {
  // let resObj = {};
  const { state } = useLocation();
  console.log(state);
  let navigate = useNavigate();

  const [itemDetails, setItemDetails] = useState({});
//   const [currencyvalue, setcurrencyValue] = useState(reduxState.currency);
  const [itemCount, setItemCount] = useState(1);
  const [shopDetails, setShopDetails] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    let isSubscribed = true;
    const fetchItemData = async () => {
        getItemData(state)
        .then ((res) => {
          if(res.data.status === 'ok') {
            // setTimeout(() => {
              setItemDetails(res.data.item[0])
              setShopDetails(res.data.item[0].SHOP)
            // });
          }
        })
    };

    if (isSubscribed) {
      fetchItemData().catch(console.error);
    //   setcurrencyValue(reduxState.currency);
    }
    return () => {
      isSubscribed = false;
    };
  }, []);

//   let currencySymbol = null;
//   if (currencyvalue === "USD") {
//     currencySymbol = <MonetizationOnIcon />;
//   } else if (currencyvalue === "Euro") {
//     currencySymbol = <EuroIcon />;
//   } else if (currencyvalue === "INR") {
//     currencySymbol = <CurrencyRupeeIcon />;
//   }

  const handleAddToCart = (event) => {
    
  };

  const handleItemCount = (event) => {
    setItemCount(event.target.value);
  };
  // let ItemDescription = (
  //   <>Description goes here</>
  // )
  // if(itemDetails.Description.length > 0) {
  //   <>{itemDetails.Description}</>
  // }
  const handleShopButton = () => {
    // navigate("/your-shop", {
    //   state: shopName,
    // });
  };

  let AddToCartButton = (
    <>
      <label for="quantity">Quantity: </label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        value={itemCount}
        min="1"
        onChange={handleItemCount}
      />
      <br />
      <br />
      <Button
        sx={{ backgroundColor: "black", color: "white" }}
        onClick={handleAddToCart}
      >
        {" "}
        Add to cart
      </Button>
    </>
  );

  if (itemDetails.QuantityAvailable === 0) {
    AddToCartButton = <h4>Item Out Of Stock</h4>;
  }
  return (
    <div className="App">
      
      <section className="content-container">
        <div className="container">
          <article className="card">
            <div className="card-body">
              <div className="row">
                <aside className="col-md-6">
                  <article className="gallery-wrap">
                    <div className="card img-big-wrap">
                      {" "}
                      {/* <img
                        src={itemDetails.ItemImage}
                        alt={itemDetails.ItemName}
                      /> */}
                      <ImageListItem key={itemDetails.ItemId}>
                        <img
                          src={itemDetails.ITEM_IMAGE ? `${backend}/images/${itemDetails.ITEM_IMAGE}` : ''}
                          name={itemDetails._id}
                          alt={itemDetails.ITEM_NAME}
                          loading="lazy"
                        />
                        <ImageListItemBar
                          sx={{ backgroundColor: "transparent" }}
                        //   actionIcon={
                        //     <Favourite data={itemDetails}></Favourite>
                        //   }
                          position="top"
                        />
                      </ImageListItem>
                    </div>
                  </article>
                </aside>
                <main className="col-md-6">
                  <article>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex justify-content-start">
                        <div className="d-flex flex-column">
                          <div className="d-flex justify-content-between"></div>
                          <h6>Category: {itemDetails.CATEGORY}</h6>{" "}
                          <h2 className="title">{itemDetails.ITEM_NAME}</h2>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <div className="d-flex justify-content-end">
                          <Button
                            sx={{ color: "black" }}
                            variant="text"
                            onClick={handleShopButton}
                          >
                            <h6>Shop: {shopDetails.SHOP_NAME}</h6>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <hr />

                    <div className="mb-3">
                      <h6>Short description</h6>
                      <p>
                        {itemDetails.DESCRIPTION || <>Description goes here</>}
                      </p>
                    </div>

                    <div className="mb-3">
                      <var className="price h4">
                        {/* {currencySymbol}  */}
                        {itemDetails.PRICE}
                      </var>{" "}
                      <br />
                    </div>

                    <div className="mb-4">
                      {/* <button
                        onClick={handleAddToCart}
                        className="btn btn-primary mr-1"
                      >
                        Add to cart
                      </button> */}
                      {/* <Button
                        sx={{ backgroundColor: "black", color: "white" }}
                        onClick={handleAddToCart}
                      >
                        {" "}
                        Add to cart
                      </Button> */}
                      {AddToCartButton}
                      &nbsp;&nbsp;&nbsp; {itemDetails.QUANTITY_SOLD} sales
                    </div>
                  </article>
                </main>
              </div>
            </div>
          </article>
        </div>
      </section>

     
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   markComplete: (itemDetails, itemCount) => {
//     dispatch(addToCart(itemDetails, itemCount));
//   },
// });

export default ItemPage;