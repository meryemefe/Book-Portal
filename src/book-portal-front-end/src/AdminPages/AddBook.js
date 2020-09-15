import React from "react";
import {
  Form,
  Button,
  Container,
  Grid,
  Divider,
  Dropdown,
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import fetch from "isomorphic-unfetch";
import "../App.css";
import { toast } from "react-toastify";
import Navbar from "./AdminNavbar";
import AddAuthorModal from "./AddAuthor";

class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      isbn: "",
      publisher: "",
      publicationYear: "",
      category: "",
      language: "",
      bookId: "",
      selectedAuthors: {},
      authorOptions: [],
    };
  }

  componentDidMount = () => {
    this.getAuthors();
  };

  handleChange = (e) => {
    const { currentTarget } = e;
    const { value, name } = currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      isbn,
      publisher,
      publicationYear,
      category,
      language,
    } = this.state;

    if (name.length < 3 || name.length > 255) {
      this.setState({
        error: "Invalid name!",
      });
      return;
    }

    fetch("http://localhost:8080/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        isbn,
        publisher,
        publicationYear,
        category,
        language,
      }),
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
      .then((data) => {
        this.setState({ bookId: data.id });
        this.addAuthors();
      })
      .catch((e) => {
        toast.error("Please, check information! You may enter wrong ISBN!");
      });
  };

  handleSelectedAuthors = (e, { value }) => {
    this.setState({ selectedAuthors: value });
  };

  addAuthors = () => {
    fetch(
      "http://localhost:8080/api/books/add-author?" +
        new URLSearchParams({
          bookId: this.state.bookId,
          authorId: this.state.selectedAuthors,
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
        toast.success("Succesfully added!");
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

  render = () => {
    const { error, authorOptions } = this.state;
    return (
      <div>
        <Navbar />
        <Container>
          <Grid columns="equal" centered>
            <Grid.Row>
              <Grid.Column width={8}>
                <h1>ADD BOOK</h1>
                <Divider />
                <Form
                  onSubmit={this.handleSubmit}
                  onReset={(e) => {
                    e.preventDefault();
                    this.setState({
                      name: "",
                      isbn: "",
                      publisher: "",
                      publicationYear: "",
                      category: "",
                      language: "",
                    });
                  }}
                >
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <Form.Field>
                          <label>Name:</label>
                          <Form.Input
                            type="text"
                            name="name"
                            value={this.state.name}
                            required
                            error={error}
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <label>ISBN:</label>
                          <Form.Input
                            type="text"
                            name="isbn"
                            value={this.state.isbn}
                            required
                            error={error}
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <Form.Field>
                          <label>Category:</label>
                          <Form.Input
                            type="text"
                            name="category"
                            value={this.state.category}
                            required
                            error={error}
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                      </Grid.Column>

                      <Grid.Column>
                        <Form.Field>
                          <label>Language:</label>
                          <Form.Input
                            type="text"
                            name="language"
                            required
                            value={this.state.language}
                            error={error}
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <Form.Field>
                          <label>Publisher:</label>
                          <Form.Input
                            type="text"
                            name="publisher"
                            required
                            value={this.state.publisher}
                            error={error}
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                      </Grid.Column>

                      <Grid.Column>
                        <Form.Field>
                          <label>Publication Year:</label>
                          <Form.Input
                            type="number"
                            name="publicationYear"
                            required
                            value={this.state.publicationYear}
                            error={error}
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <Form.Field>
                          <label>Authors:</label>
                          <Dropdown
                            placeholder="Authors"
                            required
                            fluid
                            multiple
                            search
                            selection
                            onChange={this.handleSelectedAuthors}
                            options={authorOptions}
                          />
                        </Form.Field>
                      </Grid.Column>

                      <Grid.Column>
                        <br />
                        <AddAuthorModal />
                      </Grid.Column>
                    </Grid.Row>
                    <Divider />
                    <Grid.Row columns={2}>
                      <Button.Group fluid>
                        <Button color="green" type="submit">
                          SAVE
                        </Button>
                        <Button type="reset">RESET</Button>
                      </Button.Group>
                    </Grid.Row>
                  </Grid>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  };
}

export default withRouter(AddBook);
