import axios from "axios";
import React, { useEffect, useState } from "react";
// import "./home.css";
import { Card } from "react-bootstrap";
import { ImageList } from "@mui/material";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { userReducer } = useSelector((state) => state);


  let welcomeBoard = <p>Explore one-of-a-kind finds from independent makers</p>;

  if (userReducer.userReducer.NAME) {
    const username = userReducer.userReducer.NAME;
    welcomeBoard = (
      <p>
        Welcome to Etsy, <a href="/profile-page">{username}</a>!
      </p>
    );
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
        {/* <ImageList cols={4}>
           
         
          </ImageList> */}
      </div>
    </>
  );
};
export default HomePage;
