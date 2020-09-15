import React from "react";
import {
  Container,
  Grid,
  Header,
  Icon,
  Label,
  Menu,
  Table,
  Checkbox,
  Input,
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import "../App.css";
import { toast } from "react-toastify";
import Navbar from "./AdminNavbar";

class ViewUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      currentPage: 0,
    };
  }

  componentDidMount = () => {
    this.getUsers("");
  };

  getUsers = (searchUsername) => {
    fetch(
      "http://localhost:8080/api/users?" +
        new URLSearchParams({
          pageNumber: this.state.currentPage,
          username: searchUsername,
        }),
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
        this.setState({ users: data });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  changePageTo = (i) => {
    this.setState({ currentPage: i }, this.getUsers(""));
  };

  enableDisableControl = (user) => {
    fetch("http://localhost:8080/api/users/" + user.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
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
      .catch((e) => {
        toast.error(e.message);
      });
  };

  render = () => {
    const { users } = this.state;
    return (
      <div className="App">
        <Navbar />
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column floated="left">
                <Header size="huge">USERS</Header>
              </Grid.Column>
              <Grid.Column floated="right">
                <Input
                  icon="users"
                  onChange={(e) => {
                    this.getUsers(e.target.value);
                  }}
                  iconPosition="right"
                  placeholder="Search users..."
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid columns="equal" centered>
            <Grid.Row>
              <Grid.Column width={16}>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell></Table.HeaderCell>
                      <Table.HeaderCell>USERNAME</Table.HeaderCell>
                      <Table.HeaderCell>REGISTERED ON</Table.HeaderCell>
                      <Table.HeaderCell>LIKE SCORE</Table.HeaderCell>
                      <Table.HeaderCell>READ SCORE</Table.HeaderCell>
                      <Table.HeaderCell>ACTIVE</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {users &&
                      users.content &&
                      users.content.map((value, index) => (
                        <Table.Row>
                          <Table.Cell>
                            <Label ribbon>
                              {users.size * users.number + index + 1}
                            </Label>
                          </Table.Cell>
                          <Table.Cell>{value.username}</Table.Cell>
                          <Table.Cell>
                            {value.createDate.substring(0, 10)}
                          </Table.Cell>
                          <Table.Cell>{value.likedBookList.length}</Table.Cell>
                          <Table.Cell>{value.readBookList.length}</Table.Cell>
                          <Table.Cell>
                            <Checkbox
                              toggle
                              onChange={() => {
                                this.enableDisableControl(value);
                              }}
                              defaultChecked={value.active ? true : false}
                            />
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>

                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell colSpan="6">
                        <Menu floated="right" pagination>
                          <Menu.Item
                            onClick={() => {
                              this.changePageTo(this.state.currentPage - 1);
                            }}
                            as="a"
                            icon
                            disabled={users.first}
                          >
                            <Icon name="chevron left" />
                          </Menu.Item>
                          {[...Array(users.totalPages).keys()].map(
                            (value, index) => (
                              <Menu.Item as="a" active={users.number === index}>
                                {index + 1}
                              </Menu.Item>
                            )
                          )}
                          <Menu.Item
                            onClick={() => {
                              this.changePageTo(this.state.currentPage + 1);
                            }}
                            as="a"
                            icon
                          >
                            <Icon
                              name="chevron right"
                              icon
                              disabled={users.last}
                            />
                          </Menu.Item>
                        </Menu>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  };
}

export default withRouter(ViewUsers);
