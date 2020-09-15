import React, { useState } from "react";
import { Button, Icon, Form, Modal, Header } from "semantic-ui-react";
import { toast } from "react-toastify";

function EditAuthorModal(props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(props.name);
  const [surname, setSurname] = useState(props.surname);
  const [birthYear, setBirthYear] = useState(props.birthYear);
  const [deathYear, setDeathYear] = useState(props.deathYear);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/authors/" + props.id, {
      method: "PUT",
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
        toast.success("Succesfully updated!");
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
      <Header icon="edit" content="Edit Author Information" />
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
              defaultValue={props.surname}
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
              defaultValue={props.birthYear}
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
              defaultValue={props.deathYear}
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

export default EditAuthorModal;
