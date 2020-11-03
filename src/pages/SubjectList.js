import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import { AiFillFileAdd } from 'react-icons/ai'
import axios from 'axios'
import { triggerSimpleAjax } from '../helpers/httpHelper'

export default class SubjectList extends Component {
  state = {
    subjects: []
  }

  componentDidMount() {
    triggerSimpleAjax('examination/subjects/', 'get').then((response) => {
      this.setState({
        ...this.state,
        subjects: response
      })
    })
  }

  render() {
    return (
      <div className="page-container">
        <div className="container mt-5">
          <Button className="bg-dblue mb-4" href="/subjects/create">
            <AiFillFileAdd /> Add New
          </Button>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {this.state.subjects.map((subject) => (
                <tr>
                  <td>{subject.id}</td>
                  <td>{subject.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}
