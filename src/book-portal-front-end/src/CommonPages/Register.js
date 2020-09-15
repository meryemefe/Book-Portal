import React from "react";
import { Form, Button, Container, Grid, Divider } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import fetch from "isomorphic-unfetch";
import "../App.css";
import "../css/register.css";
import { toast } from "react-toastify";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      usernameError: null,
      passwordError: null,
      confirmPasswordError: null,
    };
  }

  handleChange = (e) => {
    const { currentTarget } = e;
    const { value, name } = currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, password, confirmPassword } = this.state;

    if (username.length < 3 || username.length > 255) {
      this.setState({
        usernameError: "Username must contain at least 3 characters!",
        passwordError: null,
        confirmPasswordError: null,
      });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({
        usernameError: null,
        passwordError: "Passwords don't match! Please, check them!",
        confirmPasswordError: "Passwords don't match! Please, check them!",
      });
      return;
    }

    if (password.length < 3 || password.length > 255) {
      this.setState({
        passwordError: "Password must contain at least 3 characters!",
        confirmPasswordError: null,
        usernameError: null,
      });
      return;
    }

    fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => {
        if (r.ok) {
          return r;
        }
        if (r.status === 401 || r.status === 403 || r.status === 500) {
          return Promise.reject(new Error("Exception occured!"));
        }
      })
      .then((r) => r.json())
      .then((response) => {
        setTimeout(() => {
          this.props.history.push("/");
        }, 2000);
        toast.success(
          "Succesfully registered! You will be redirected to Login page!"
        );
      })
      .catch((e) => {
        toast.error("Username has already been taken. Please try another one!");
      });
  };

  render = () => {
    const { usernameError, passwordError, confirmPasswordError } = this.state;
    return (
      <div className="Register-Form">
        <Container>
          <Grid columns="equal" centered>
            <Grid.Row>
              <Grid.Column width={5}>
                <h1>REGISTER</h1>
                <Form
                  onSubmit={this.handleSubmit}
                  onReset={(e) => {
                    e.preventDefault();
                    this.setState({
                      username: "",
                      password: "",
                      confirmPassword: "",
                      usernameError: null,
                      passwordError: null,
                      confirmPasswordError: null,
                    });
                  }}
                >
                  <Form.Field>
                    <label>Username:</label>
                    <Form.Input
                      type="email"
                      name="username"
                      value={this.state.username}
                      required
                      error={usernameError}
                      onChange={this.handleChange}
                    />
                  </Form.Field>

                  <Form.Field>
                    <label>Password:</label>
                    <Form.Input
                      type="password"
                      name="password"
                      value={this.state.password}
                      required
                      error={passwordError}
                      onChange={this.handleChange}
                    />
                  </Form.Field>

                  <Form.Field>
                    <label>Confirm password:</label>
                    <Form.Input
                      type="password"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      required
                      error={confirmPasswordError}
                      onChange={this.handleChange}
                    />
                  </Form.Field>

                  <Button.Group fluid>
                    <Button color="green" type="submit">
                      REGISTER
                    </Button>
                    <Button color="" type="reset">
                      RESET
                    </Button>
                  </Button.Group>
                </Form>
                <Divider />
                <Link to="/">Already have an account? Sign in!</Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  };
}

export default withRouter(Register);
