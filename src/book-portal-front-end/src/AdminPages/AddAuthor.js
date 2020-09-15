import React, { useState } from "react";
import { Button, Icon, Form, Modal, Header } from "semantic-ui-react";
import { toast } from "react-toastify";

function AddAuthorModal(props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [birthYear, setBirthYear] = useState();
  const [deathYear, setDeathYear] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name, surname, birthYear, deathYear }),
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
      .then((response) => {
        toast.success("Succesfully added!");
        setOpen(false);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <Modal
      closeIcon
      open={open}
      trigger={
        <Button color="blue" animated>
          <Button.Content visible>ADD NEW AUTHOR</Button.Content>
          <Button.Content hidden>
            <Icon name="add user" />
          </Button.Content>
        </Button>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="add user" content="Add New Author" />
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Name:</label>
            <Form.Input
              defaultValue={props.name}
              type="text"
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Surname:</label>
            <Form.Input
              type="text"
              name="surname"
              onChange={(e) => {
                setSurname(e.target.value);
              }}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Birth Year:</label>
            <Form.Input
              type="number"
              name="birthYear"
              onChange={(e) => {
                setBirthYear(e.target.value);
              }}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Death Year:</label>
            <Form.Input
              type="number"
              name="deathYear"
              onChange={(e) => {
                setDeathYear(e.target.value);
              }}
            />
          </Form.Field>
          <Button.Group fluid>
            <Button color="green" type="submit">
              SAVE
            </Button>
            <Button type="reset">RESET</Button>
          </Button.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default AddAuthorModal;
