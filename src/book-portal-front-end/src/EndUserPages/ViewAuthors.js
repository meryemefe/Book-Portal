import React from "react";
import {
  Container,
  Grid,
  Header,
  Icon,
  Label,
  Menu,
  Table,
  Input,
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import "../App.css";
import { toast } from "react-toastify";
import Navbar from "./UserNavbar";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: {},
      currentPage: 0,
    };
  }

  componentDidMount = () => {
    this.getAuthors("");
  };

  getAuthors = (searchFullname) => {
    fetch(
      "http://localhost:8080/api/authors?" +
        new URLSearchParams({
          pageNumber: this.state.currentPage,
          fullname: searchFullname,
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
        this.setState({ authors: data });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  changePageTo = (i) => {
    this.setState({ currentPage: i }, this.getAuthors(""));
  };

  render = () => {
    const { authors } = this.state;
    return (
      <div className="App">
        <Navbar />
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column floated="left">
                <Header size="huge">AUTHORS</Header>
              </Grid.Column>
              <Grid.Column floated="right">
                <Input
                  icon="users"
                  onChange={(e) => {
                    this.getAuthors(e.target.value);
                  }}
                  iconPosition="right"
                  placeholder="Search authors..."
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
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Surname</Table.HeaderCell>
                      <Table.HeaderCell>Birth Year</Table.HeaderCell>
                      <Table.HeaderCell>Death Year</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {authors &&
                      authors.content &&
                      authors.content.map((value, index) => (
                        <Table.Row>
                          <Table.Cell>
                            <Label ribbon>
                              {authors.size * authors.number + index + 1}
                            </Label>
                          </Table.Cell>
                          <Table.Cell>{value.name}</Table.Cell>
                          <Table.Cell>{value.surname}</Table.Cell>
                          <Table.Cell>{value.birthYear}</Table.Cell>
                          <Table.Cell>
                            {value.deathYear !== 0 ? value.deathYear : "-"}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>

                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell colSpan="5">
                        <Menu floated="right" pagination>
                          <Menu.Item
                            onClick={() => {
                              this.changePageTo(this.state.currentPage - 1);
                            }}
                            as="a"
                            icon
                            disabled={authors.first}
                          >
                            <Icon name="chevron left" />
                          </Menu.Item>
                          {[...Array(authors.totalPages).keys()].map(
                            (value, index) => (
                              <Menu.Item
                                as="a"
                                active={authors.number === index}
                              >
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
                              disabled={authors.last}
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

export default withRouter(Dashboard);
