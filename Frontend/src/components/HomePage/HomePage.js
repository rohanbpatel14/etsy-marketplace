import React, { useEffect, useState } from "react";
// import "./home.css";
import { Button, Card } from "react-bootstrap";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useSelector } from "react-redux";
import { getAllItems } from "../../service/itemService";
import { backend } from "../../config/backend";
import Favourite from "./Favourite";
import { useNavigate } from "react-router";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const HomePage = () => {
  const { userReducer, currencyReducer } = useSelector((state) => state);
  const userReduxData = userReducer.userReducer;
  const currencyvalue = currencyReducer.currencyReducer.currency;

  const navigate = useNavigate();

  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    let isSubscribed = true;

    const fetchAllItem = async () => {
      getAllItems().then((res) => {
        setItemList(res.data);
      });
    };
    if (isSubscribed) {
      fetchAllItem().catch(console.error);
    }

    return () => {
      isSubscribed = false;
    };
  }, []);

  const imageClickHandler = (e) => {
    navigate("/item", {
      state: e.target.name,
    });
  };

  let currencySymbol = null;
  if (currencyvalue === "USD") {
    currencySymbol = <MonetizationOnIcon />;
  } else if (currencyvalue === "Euro") {
    currencySymbol = <EuroIcon />;
  } else if (currencyvalue === "INR") {
    currencySymbol = <CurrencyRupeeIcon />;
  }

  let welcomeBoard = <p>Explore one-of-a-kind finds from independent makers</p>;

  if (userReduxData.NAME) {
    welcomeBoard = (
      <p>
        Welcome to Etsy, <a href="/profile-page">{userReduxData.NAME}</a>!
      </p>
    );
  }
  let itemImageData = <>Loading Images</>;
  if (itemList) {
    itemImageData = itemList.map((item) => (
      <ImageListItem key={item._id}>
        <img
          src={`${backend}/images/${item.ITEM_IMAGE}`}
          name={item._id}
          alt={item.ITEM_NAME}
          onClick={imageClickHandler}
        />
        <ImageListItemBar
          sx={{ backgroundColor: "transparent" }}
          title={
            <Button style={{ backgroundColor: "black", borderRadius: "40px" }}>
              {currencySymbol} {' '}
              {item.PRICE}
            </Button>
          }
          actionIcon={<Favourite data={item}></Favourite>}
        />
      </ImageListItem>
    ));
  }

  return (
    <>
      <div>
        <Card
          style={{
            textAlign: "center",
            background: "#fdebd2",
            height: "200px",
          }}
        >
          <Card.Body>
            <Card.Text
              style={{ fontSize: "50px", fontFamily: "Times New Roman" }}
            >
              {welcomeBoard}
            </Card.Text>
          </Card.Body>
        </Card>
        <ImageList cols={4}>{itemImageData}</ImageList>
      </div>
    </>
  );
};
export default HomePage;
