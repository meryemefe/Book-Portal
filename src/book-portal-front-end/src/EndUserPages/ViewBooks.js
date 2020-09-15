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
  Input,
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import "../App.css";
import { toast } from "react-toastify";
import Navbar from "./UserNavbar";
import AuthService from "../CommonPages/AuthService";
import BookDetailsModal from "../AdminPages/BookDetails";

class ViewBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: {},
      currentPage: 0,
      likedBooks: [],
      readBooks: [],
    };
  }

  componentDidMount = () => {
    this.getBooks("");
    this.getLikeList();
    this.getReadList();
  };

  getLikeList = () => {
    const currentUserId = AuthService.getCurrentUserId();

    fetch(
      "http://localhost:8080/api/users/get-favorite-list?" +
        new URLSearchParams({ userId: currentUserId }),
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
          likedBooks: data.map((a) => a.id),
        });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  getReadList = () => {
    const currentUserId = AuthService.getCurrentUserId();

    fetch(
      "http://localhost:8080/api/users/get-read-list?" +
        new URLSearchParams({ userId: currentUserId }),
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
          readBooks: data.map((a) => a.id),
        });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  getBooks = (searchBookName) => {
    fetch(
      "http://localhost:8080/api/books?" +
        new URLSearchParams({
          pageNumber: this.state.currentPage,
          name: searchBookName,
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
        this.setState({ books: data });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  changePageTo = (i) => {
    this.setState({ currentPage: i }, this.getBooks(""));
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

  addToFavoriteList = (bookIdParam) => {
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

  addToReadList = (bookIdParam) => {
    fetch(
      "http://localhost:8080/api/users/read-book?" +
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

  render = () => {
    let { books, likedBooks, readBooks } = this.state;

    return (
      <div className="App">
        <Navbar />
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column floated="left">
                <Header size="huge">BOOKS</Header>
              </Grid.Column>
              <Grid.Column floated="right">
                <Input
                  icon="book"
                  onChange={(e) => {
                    this.getBooks(e.target.value);
                  }}
                  iconPosition="right"
                  placeholder="Search books..."
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
                      <Table.HeaderCell>AUTHORS</Table.HeaderCell>
                      <Table.HeaderCell>PUBLISHER</Table.HeaderCell>
                      <Table.HeaderCell>PUBLICATION YEAR</Table.HeaderCell>
                      <Table.HeaderCell>CATEGORY</Table.HeaderCell>
                      <Table.HeaderCell>LANGUAGE</Table.HeaderCell>
                      <Table.HeaderCell>LIKE RATE</Table.HeaderCell>
                      <Table.HeaderCell>READ RATE</Table.HeaderCell>
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
                          <Table.Cell>{value.name}</Table.Cell>
                          <Table.Cell>{this.renderAuthors(value)}</Table.Cell>
                          <Table.Cell>{value.publisher}</Table.Cell>
                          <Table.Cell>{value.publicationYear}</Table.Cell>
                          <Table.Cell>{value.category}</Table.Cell>
                          <Table.Cell>{value.language}</Table.Cell>
                          <Table.Cell>
                            <Button
                              icon="heart"
                              onClick={() => {
                                this.addToFavoriteList(value.id);
                              }}
                              title={
                                likedBooks.includes(value.id)
                                  ? "Remove from favorite list"
                                  : "Add to favorite like"
                              }
                              color={
                                likedBooks.includes(value.id) ? "red" : "gray"
                              }
                              label={{
                                as: "a",
                                basic: true,
                                content: this.renderLikeRate(value),
                              }}
                              labelPosition="right"
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Button
                              icon="book"
                              onClick={() => {
                                this.addToReadList(value.id);
                              }}
                              title={
                                readBooks.includes(value.id)
                                  ? "Remove from read list"
                                  : "Add to read list"
                              }
                              color={
                                readBooks.includes(value.id) ? "red" : "gray"
                              }
                              label={{
                                as: "a",
                                basic: true,
                                content: this.renderReadRate(value),
                              }}
                              labelPosition="right"
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <BookDetailsModal
                              name={value.name}
                              isbn={value.isbn}
                              authors={value.authors}
                              publisher={value.publisher}
                              publicationYear={value.publicationYear}
                              category={value.category}
                              language={value.language}
                              likeRate={this.renderLikeRate(value)}
                              readRate={this.renderReadRate(value)}
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

export default withRouter(ViewBooks);
