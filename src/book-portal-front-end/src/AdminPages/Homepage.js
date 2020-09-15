import React from "react";
import { Container, Grid, Divider } from "semantic-ui-react";
import "../App.css";

import Navbar from "./AdminNavbar";

const Homepage = () => {
  return (
    <div className="App">
      <Navbar />
      <Container>
        <div>
          <Grid.Column width={16}>
            <div className="Main-Content">
              <h1>ADMIN HOMEPAGE</h1>
              <Divider />
              <p className="Explanation-Text">
                <i>"I read a book one day and my whole life was changed."</i>
                <br />
                <i>― Orhan Pamuk</i>
                <br />
                <br />
                Welcome to Book Portal! As one of our respectful admins, you can
                add new book, author as well as you can see and block users.
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
