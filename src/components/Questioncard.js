import React from 'react'
import { Card, Button } from 'react-bootstrap'

export default function Questioncard(props) {
  let { name, description, exam, subject } = props

  return (
    <Card className="shadow-lg p-3 mb-5 bg-white rounded mt-5">
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{exam}</Card.Text>
        <Card.Text>{subject}</Card.Text>

        {props.related_questions.map((related_question) => (
          <div>
            <Card.Text>{related_question.name}</Card.Text>
            <Card.Text>{related_question.description}</Card.Text>
            <Card.Text>{related_question.max_marks}</Card.Text>
          </div>
        ))}
        <Button variant="primary">Edit</Button>
      </Card.Body>
    </Card>
  )
}
