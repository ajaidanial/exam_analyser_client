import React from 'react'
import { Card, Button } from 'react-bootstrap'

export default function Questioncard(props) {
  let { name, description, exam, subject, related_questions = [] } = props
  return (
    <Card className="shadow-lg p-3 mb-5 bg-white rounded mt-5">
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{exam}</Card.Text>
        <Card.Text>{subject}</Card.Text>
        {/* {this.state.related_questions.map((related_question) => (
          <tr>
            <td>{related_question.name}</td>
            <td>{related_question.max_marks}</td>
          </tr>
        ))} */}
        <Button variant="primary">Edit</Button>
      </Card.Body>
    </Card>
  )
}
