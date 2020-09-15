import React from "react";
import { Grid, Divider } from "semantic-ui-react";
import "../css/main.css";

const Error = () => {
  return (
    <div>
      <Grid>
        <Grid.Column width={16}>
          <div className="Main-Content">
            <h1>UPSSS, ERROR!</h1>
            <Divider />
            <p>
              An unknown error has been occured. The page you want to visit may
              be permanently deleted or you may not have permission for this
              page.
            </p>
          </div>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Error;
