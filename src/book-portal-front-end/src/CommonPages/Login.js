import React, { useState } from "react";
import { Divider, Form, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import fetch from "isomorphic-unfetch";
import "../App.css";
import { toast } from "react-toastify";

const Login = () => {
  const history = useHistory();

  const [usernamePassword, setUsernamePassword] = useState({
    username: "",
    password: "",
  });

  const [usernamePasswordError, setUsernamePasswordError] = useState({
    usernameError: null,
    passwordError: null,
  });

  const handleChange = (e) => {
    const { currentTarget } = e;
    const { value, name } = currentTarget;

    setUsernamePassword({ ...usernamePassword, [name]: value });
  };

  const getUserId = (usernameParam) => {
    fetch(
      "http://localhost:8080/api/users/getByUsername?" +
        new URLSearchParams({ username: usernameParam }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )
      .then((r) => {
        if (r.ok) {
          return r;
        }
        if (r.status === 401 || r.status === 403 || r.status === 500) {
          return Promise.reject(new Error("Exception occured!"));
        }
      })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        localStorage.setItem("userId", JSON.stringify(data.id));
        let roles = [];
        for (let i = 0; i < data.roles.length; i++) {
          roles.push(data.roles[i].id);
        }
        localStorage.setItem("userRoles", JSON.stringify(roles));
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = usernamePassword;

    if (username.length < 3 || username.length > 255) {
      setUsernamePasswordError({
        usernameError: "Username must contain at least 3 characters!",
        passwordError: null,
      });
      return;
    }

    if (password.length < 3 || password.length > 255) {
      setUsernamePasswordError({
        passwordError: "Password must contain at least 3 characters!",
        usernameError: null,
      });
      return;
    }

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
      credentials: "include",
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
        getUserId(username);
        toast.success("Login request is succesfull. You will be redicting!");
        setTimeout(() => {
          if (localStorage.getItem("userRoles").includes("2")) {
            history.push("/admin");
          } else if (localStorage.getItem("userRoles").includes("1")) {
            history.push("/user");
          }
        }, 1000);
      })
      .catch((e) => {
        toast.error(
          "You entered wrong username or password. Please check them!"
        );
      });
  };

  return (
    <div className="FormContent">
      <Form
        onSubmit={handleSubmit}
        onReset={(e) => {
          e.preventDefault();
          setUsernamePassword({
            username: "",
            password: "",
          });
          setUsernamePasswordError({
            usernameError: null,
            passwordError: null,
          });
        }}
      >
        <Form.Field>
          <label>Username:</label>
          <Form.Input
            type="email"
            name="username"
            value={usernamePassword.username}
            required
            error={usernamePasswordError.usernameError}
            onChange={handleChange}
          />
        </Form.Field>

        <Form.Field>
          <label>Password:</label>
          <Form.Input
            type="password"
            name="password"
            value={usernamePassword.password}
            required
            error={usernamePasswordError.passwordError}
            onChange={handleChange}
          />
        </Form.Field>

        <Button.Group fluid>
          <Button color="green" type="submit">
            LOGIN
          </Button>
          <Button color="" type="reset">
            RESET
          </Button>
        </Button.Group>
      </Form>
      <Divider />
      <Link to="/register">Don't have an account? Sign up!</Link>
    </div>
  );
};

export default Login;
