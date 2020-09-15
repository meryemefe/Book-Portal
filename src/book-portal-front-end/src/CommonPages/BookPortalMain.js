import React from "react";
import { Grid, Divider } from "semantic-ui-react";
import Login from "./Login";
import "../css/main.css";

const BookPortalMain = () => {
  return (
    <div>
      <Grid stackable columns={2}>
        <Grid.Column width={10}>
          <div className="Main-Content">
            <h1>BOOK PORTAL</h1>
            <Divider />
            <p>
              "I declare after all there is no enjoyment like reading! How much
              sooner one tires of anything than of a book! When I have a house
              of my own, I shall be miserable if I have not an excellent
              library."
            </p>
            <p>― Jane Austen, Pride and Prejudice</p>
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <div className="Form-Login">
            <Login />
          </div>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default BookPortalMain;
