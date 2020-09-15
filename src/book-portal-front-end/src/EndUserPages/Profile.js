import React, { useState } from "react";
import { Container, Grid, Form, Button } from "semantic-ui-react";
import fetch from "isomorphic-unfetch";
import "../App.css";
import { toast } from "react-toastify";
import Navbar from "./UserNavbar";
import AuthService from "../CommonPages/AuthService";

const Profile = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [newPasswordError, setNewPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword.length < 3 || newPassword.length > 255) {
      setNewPasswordError("Password must contain at least 3 characters!");
      setConfirmPasswordError(null);
    }

    if (newPassword !== confirmPassword) {
      setNewPasswordError("Passwords don't match!");
      setConfirmPasswordError("Passwords don't match!");
    } else {
      setNewPasswordError(null);
      setConfirmPasswordError(null);
    }

    fetch("http://localhost:8080/api/users/" + AuthService.getCurrentUserId(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ password: newPassword }),
    })
      .then((r) => {
        if (r.ok) {
          return r;
        }
        if (r.status === 401 || r.status === 403 || r.status === 500) {
          return Promise.reject(new Error("Error occured!"));
        }
      })
      .then((response) => {
        toast.success("Your password succesfully updated!");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="App">
      <Navbar />
      <Container>
        <Grid columns="equal" centered>
          <Grid.Row>
            <Grid.Column width={6}>
              <h1>Change Password</h1>

              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label>New Password:</label>
                  <Form.Input
                    type="password"
                    name="newPassword"
                    error={newPasswordError}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    required
                  />
                </Form.Field>
                <Form.Field>
                  <label>Confirm Password:</label>
                  <Form.Input
                    type="password"
                    name="confirmPassword"
                    error={confirmPasswordError}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    required
                  />
                </Form.Field>
                <Button.Group fluid>
                  <Button color="green" type="submit">
                    SAVE
                  </Button>
                  <Button type="reset">RESET</Button>
                </Button.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default Profile;
