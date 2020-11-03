import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import { RiAddCircleFill } from 'react-icons/ri'
import axios from 'axios'
import { triggerSimpleAjax } from '../helpers/httpHelper'

export default class ExamsList extends Component {
  state = {
    exams: []
  }
  componentDidMount() {
    triggerSimpleAjax('examination/exams/', 'get').then((response) => {
      this.setState({
        ...this.state,
        exams: response
      })
    })
  }

  render() {
    return (
      <div className="page-container">
        <div className="container mt-5">
          <Button className="bg-dblue mb-4" href="/exams/create">
            <RiAddCircleFill /> Add New
          </Button>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {this.state.exams.map((exam) => (
                <tr>
                  <td>{exam.id}</td>
                  <td>{exam.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}
