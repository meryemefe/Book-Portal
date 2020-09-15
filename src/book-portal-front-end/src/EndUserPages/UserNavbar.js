import React, { Component } from "react";
import { Menu, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import AuthService from "../CommonPages/AuthService";

export default class UserNavbar extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu size="large">
        <Menu.Item
          name="Homepage"
          active={activeItem === "homepage"}
          onClick={this.handleItemClick}
          as={Link}
          to="/user"
        />
        <Menu.Item
          name="Books"
          active={activeItem === "books"}
          onClick={this.handleItemClick}
          as={Link}
          to="/user-books"
        />
        <Menu.Item
          name="Authors"
          active={activeItem === "authors"}
          onClick={this.handleItemClick}
          as={Link}
          to="/user-authors"
        />
        <Menu.Item
          name="Favorite List"
          active={activeItem === "favoriteList"}
          onClick={this.handleItemClick}
          as={Link}
          to="/user-favorite-list"
        />
        <Menu.Item
          name="Read List"
          active={activeItem === "readList"}
          onClick={this.handleItemClick}
          as={Link}
          to="/user-read-list"
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="Profile"
            active={activeItem === "profile"}
            onClick={this.handleItemClick}
            as={Link}
            to="/user-profile"
          />

          <Menu.Item>
            <Button
              primary
              onClick={(e) => {
                e.preventDefault();
                AuthService.logout();
              }}
            >
              Logout
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
