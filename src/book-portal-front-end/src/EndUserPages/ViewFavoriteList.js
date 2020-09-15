import React from "react";
import {
  Container,
  Grid,
  Header,
  Icon,
  Label,
  Menu,
  Table,
  Button,
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import "../App.css";
import { toast } from "react-toastify";
import Navbar from "./UserNavbar";
import AuthService from "../CommonPages/AuthService";
import BookDetailsModal from "../AdminPages/BookDetails";

class FavoriteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: {},
      currentPage: 0,
      currentUserId: AuthService.getCurrentUserId(),
    };
  }

  componentDidMount = () => {
    this.getLikeList();
  };

  getLikeList = () => {
    const currentUserId = AuthService.getCurrentUserId();

    fetch(
      "http://localhost:8080/api/users/get-favorite-list-page?" +
        new URLSearchParams({
          userId: currentUserId,
          pageNumber: this.state.currentPage,
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
        this.setState({
          books: data,
        });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  changePageTo = (i) => {
    this.setState({ currentPage: i }, this.getBooks);
  };

  renderAuthors = (book) => {
    const items = [];
    if (book && book.authors) {
      for (let i = 0; i < book.authors.length; i++) {
        const author = book.authors[i];
        items.push(
          <>
            {author.name + " " + author.surname}
            <br />
          </>
        );
      }
    }
    return items;
  };

  removeFromFavoriteList = (bookIdParam) => {
    fetch(
      "http://localhost:8080/api/users/like-book?" +
        new URLSearchParams({
          userId: AuthService.getCurrentUserId(),
          bookId: bookIdParam,
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
      .catch((e) => {
        toast.error(e.message);
      });
  };

  renderLikeRate = (book) => {
    if (book && book.likedByUserList) {
      return book.likedByUserList.length;
    }
    return 0;
  };

  renderReadRate = (book) => {
    if (book && book.readByUserList) {
      return book.readByUserList.length;
    }
    return 0;
  };

  render = () => {
    const { books } = this.state;

    return (
      <div className="App">
        <Navbar />
        <Container>
          <Grid columns="equal" centered>
            <Grid.Row>
              <Grid.Column width={16}>
                <Header size="huge">BOOKS</Header>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell></Table.HeaderCell>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>AUTHORS</Table.HeaderCell>
                      <Table.HeaderCell>PUBLISHER</Table.HeaderCell>
                      <Table.HeaderCell>PUBLICATION YEAR</Table.HeaderCell>
                      <Table.HeaderCell>CATEGORY</Table.HeaderCell>
                      <Table.HeaderCell>LANGUAGE</Table.HeaderCell>
                      <Table.HeaderCell>LIKE</Table.HeaderCell>
                      <Table.HeaderCell>DATE</Table.HeaderCell>
                      <Table.HeaderCell>DETAILS</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {books &&
                      books.content &&
                      books.content.map((value, index) => (
                        <Table.Row>
                          <Table.Cell>
                            <Label ribbon>
                              {books.size * books.number + index + 1}
                            </Label>
                          </Table.Cell>
                          <Table.Cell>{value[0].name}</Table.Cell>
                          <Table.Cell>
                            {this.renderAuthors(value[0])}
                          </Table.Cell>
                          <Table.Cell>{value[0].publisher}</Table.Cell>
                          <Table.Cell>{value[0].publicationYear}</Table.Cell>
                          <Table.Cell>{value[0].category}</Table.Cell>
                          <Table.Cell>{value[0].language}</Table.Cell>
                          <Table.Cell>
                            <Button
                              icon="heart"
                              onClick={() => {
                                this.removeFromFavoriteList(value[0].id);
                              }}
                              title={"Remove from favorite list"}
                              color={"red"}
                            />
                          </Table.Cell>
                          <Table.Cell>{value[1]}</Table.Cell>
                          <Table.Cell>
                            <BookDetailsModal
                              name={value[0].name}
                              isbn={value[0].isbn}
                              authors={value[0].authors}
                              publisher={value[0].publisher}
                              publicationYear={value[0].publicationYear}
                              category={value[0].category}
                              language={value[0].language}
                              likeRate={this.renderLikeRate(value[0])}
                              readRate={this.renderReadRate(value[0])}
                            />
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>
                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell colSpan="10">
                        <Menu floated="right" pagination>
                          <Menu.Item
                            onClick={() => {
                              this.changePageTo(this.state.currentPage - 1);
                            }}
                            as="a"
                            icon
                            disabled={books.first}
                          >
                            <Icon name="chevron left" />
                          </Menu.Item>
                          {[...Array(books.totalPages).keys()].map(
                            (value, index) => (
                              <Menu.Item as="a" active={books.number === index}>
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
                              disabled={books.last}
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

export default withRouter(FavoriteList);
