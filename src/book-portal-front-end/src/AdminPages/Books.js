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
import Navbar from "./AdminNavbar";
import BookDetailsModal from "./BookDetails";
import EditBookModal from "./EditBook";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: {},
      currentPage: 0,
      authorOptions: {},
    };
  }

  componentDidMount = () => {
    this.getBooks("");
    this.getAuthors();
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

  deleteBook = (deletedId) => {
    fetch("http://localhost:8080/api/books/" + deletedId, {
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
      .then((data) => {
        this.getBooks("");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  getAuthors = () => {
    fetch("http://localhost:8080/api/authors/list", {
      method: "GET",
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
      .then((data) => {
        let authors = [];
        for (let i = 0; i < data.length; i++) {
          authors.push({
            key: data[i].id,
            value: data[i].id,
            text: data[i].name + " " + data[i].surname,
          });
        }
        this.setState({ authorOptions: authors });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  selectedAuthors = (authors) => {
    let items = [];
    for (let i = 0; i < authors.length; i++) {
      const author = authors[i];
      items.push(author.id);
    }
    return items;
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
    const { books, authorOptions } = this.state;
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
                      <Table.HeaderCell>ISBN</Table.HeaderCell>
                      <Table.HeaderCell>AUTHORS</Table.HeaderCell>
                      <Table.HeaderCell>PUBLISHER</Table.HeaderCell>
                      <Table.HeaderCell>PUBLICATION YEAR</Table.HeaderCell>
                      <Table.HeaderCell>CATEGORY</Table.HeaderCell>
                      <Table.HeaderCell>LANGUAGE</Table.HeaderCell>
                      <Table.HeaderCell>DETAILS</Table.HeaderCell>
                      <Table.HeaderCell>Edit?</Table.HeaderCell>
                      <Table.HeaderCell>Remove?</Table.HeaderCell>
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
                          <Table.Cell>{value.isbn}</Table.Cell>
                          <Table.Cell>{this.renderAuthors(value)}</Table.Cell>
                          <Table.Cell>{value.publisher}</Table.Cell>
                          <Table.Cell>{value.publicationYear}</Table.Cell>
                          <Table.Cell>{value.category}</Table.Cell>
                          <Table.Cell>{value.language}</Table.Cell>
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
                          <Table.Cell>
                            <EditBookModal
                              id={value.id}
                              name={value.name}
                              isbn={value.isbn}
                              authors={this.selectedAuthors(value.authors)}
                              publisher={value.publisher}
                              publicationYear={value.publicationYear}
                              category={value.category}
                              language={value.language}
                              authorOptions={authorOptions}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Button
                              animated
                              color="red"
                              onClick={() => {
                                this.deleteBook(value.id);
                              }}
                            >
                              <Button.Content visible>DELETE</Button.Content>
                              <Button.Content hidden>
                                <Icon name="remove" />
                              </Button.Content>
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>

                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell colSpan="11">
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

export default withRouter(Dashboard);
