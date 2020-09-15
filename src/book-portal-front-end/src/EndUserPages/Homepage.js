import React from "react";
import { Container, Grid, Divider } from "semantic-ui-react";
import "../App.css";

import Navbar from "./UserNavbar";

const Homepage = () => {
  return (
    <div className="App">
      <Navbar />
      <Container>
        <div>
          <Grid.Column width={16}>
            <div className="Main-Content">
              <h1>USER HOMEPAGE</h1>
              <Divider />
              <p className="Explanation-Text">
                <i>"I read a book one day and my whole life was changed."</i>
                <br />
                <i>― Orhan Pamuk</i>
                <br />
                <br />
                Welcome to Book Portal! As one of our respectful users, you can
                see the books, authors as well as you can add the books to your
                favorites list or read list.
                <br />
                Have a good time!
              </p>
            </div>
          </Grid.Column>
        </div>
      </Container>
    </div>
  );
};

export default Homepage;
