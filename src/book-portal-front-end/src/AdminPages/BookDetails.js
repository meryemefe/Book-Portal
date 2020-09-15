import React, { useState } from "react";
import { Button, Icon, Modal, Header } from "semantic-ui-react";

function BookDetailsModal(props) {
  const [open, setOpen] = useState(false);

  const showAuthors = () => {
    const items = [];
    if (props.authors.length > 0) {
      for (let i = 0; i < props.authors.length - 1; i++) {
        const author = props.authors[i];
        items.push(<>{author.name + " " + author.surname}, </>);
      }

      const authorLast = props.authors[props.authors.length - 1];
      items.push(<>{authorLast.name + " " + authorLast.surname}</>);
    }
    return items;
  };

  return (
    <Modal
      closeIcon
      open={open}
      trigger={
        <Button animated>
          <Button.Content visible>MORE</Button.Content>
          <Button.Content hidden>
            <Icon name="list alternate" />
          </Button.Content>
        </Button>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="list alternate" content="Book Details" />
      <Modal.Content>
        <h3>
          <strong>NAME: </strong>
          {props.name}
          <br />

          <strong>ISBN: </strong>
          {props.isbn}
          <br />

          <strong>AUTHORS: </strong>
          {showAuthors()}
          <br />

          <strong>PUBLISHER: </strong>
          {props.publisher}
          <br />

          <strong>PUBLICATION YEAR: </strong>
          {props.publicationYear}
          <br />

          <strong>CATEGORY: </strong>
          {props.category}
          <br />

          <strong>LANGUAGE: </strong>
          {props.language}
          <br />
          <strong>LIKE RATE: </strong>
          {props.likeRate}
          <br />

          <strong>READ RATE: </strong>
          {props.readRate}
        </h3>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={() => setOpen(false)}>
          <Icon name="checkmark" /> OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default BookDetailsModal;
