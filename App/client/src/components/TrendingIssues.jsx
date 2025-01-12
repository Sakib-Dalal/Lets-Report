// IssueCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const IssueCard = ({ issue }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{issue.title}</Card.Title>
        <Card.Text>{issue.description}</Card.Text>
        <Card.Img variant="top" src={issue.imageUrl} />
        <div className="mt-3">
          <Button variant="success" className="me-2">Complete</Button>
          <Button variant="warning" className="me-2">Pending</Button>
          <Button variant="danger">In Progress</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default IssueCard;
