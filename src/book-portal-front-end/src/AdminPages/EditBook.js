import React, { useState } from "react";
import {
  Button,
  Icon,
  Form,
  Modal,
  Header,
  Grid,
  Divider,
  Dropdown,
} from "semantic-ui-react";
import { toast } from "react-toastify";

function EditBookModal(props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(props.name);
  const [isbn, setIsbn] = useState(props.isbn);
  const [authors, setAuthors] = useState(props.authors);
  const [publisher, setPublisher] = useState(props.publisher);
  const [publicationYear, setPublicationYear] = useState(props.publicationYear);
  const [category, setCategory] = useState(props.category);
  const [language, setLanguage] = useState(props.language);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/books/" + props.id, {
      method: "PUT",
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
        updateAuthors();
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const updateAuthors = () => {
    fetch(
      "http://localhost:8080/api/books/add-author?" +
        new URLSearchParams({
          bookId: props.id,
          authorId: authors,
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

  const handleSelectedAuthors = (e, { value }) => {
    setAuthors(value);
  };

  return (
    <Modal
      closeIcon
      open={open}
      trigger={
        <Button animated>
          <Button.Content visible>EDIT</Button.Content>
          <Button.Content hidden>
            <Icon name="edit" />
          </Button.Content>
        </Button>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="edit" content="Edit Book" />
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Field>
                  <label>Name:</label>
                  <Form.Input
                    defaultValue={props.name}
                    type="text"
                    name="name"
                    required
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>ISBN:</label>
                  <Form.Input
                    defaultValue={props.isbn}
                    type="text"
                    name="isbn"
                    required
                    onChange={(e) => {
                      setIsbn(e.target.value);
                    }}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Field>
                  <label>Category:</label>
                  <Form.Input
                    defaultValue={props.category}
                    type="text"
                    name="category"
                    required
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  />
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Form.Field>
                  <label>Language:</label>
                  <Form.Input
                    defaultValue={props.language}
                    type="text"
                    name="language"
                    onChange={(e) => {
                      setLanguage(e.target.value);
                    }}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Field>
                  <label>Publisher:</label>
                  <Form.Input
                    defaultValue={props.publisher}
                    type="text"
                    name="publisher"
                    onChange={(e) => {
                      setPublisher(e.target.value);
                    }}
                  />
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Form.Field>
                  <label>Publication Year:</label>
                  <Form.Input
                    defaultValue={props.publicationYear}
                    type="number"
                    name="publicationYear"
                    onChange={(e) => {
                      setPublicationYear(e.target.value);
                    }}
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
                    fluid
                    multiple
                    search
                    selection
                    onChange={handleSelectedAuthors}
                    options={props.authorOptions}
                    defaultValue={props.authors}
                  />
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <br />
              </Grid.Column>
            </Grid.Row>
            <Divider />
            <Grid.Row columns={2}>
              <Button.Group fluid>
                <Button type="submit">SAVE</Button>
                <Button color="teal" type="reset">
                  RESET
                </Button>
              </Button.Group>
            </Grid.Row>
          </Grid>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={() => setOpen(false)}>
          <Icon name="checkmark" /> OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default EditBookModal;
