import React, { Component } from "react";
import { Menu, Dropdown, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import AuthService from "../CommonPages/AuthService";

export default class AdmminNavbar extends Component {
  state = {};

  render() {
    return (
      <Menu size="large">
        <Menu.Item name="Homepage" as={Link} to="/admin" />
        <Menu.Item name="Users" as={Link} to="/admin-users" />
        <Dropdown item text="Books">
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/admin-add-book">
              Add Books
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/admin-books">
              View Books
            </Dropdown.Item>
            <Dropdown.Item></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item name="Authors" as={Link} to="/admin-authors" />
        <Menu.Menu position="right">
          <Menu.Item name="Profile" as={Link} to="/admin-profile" />

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
