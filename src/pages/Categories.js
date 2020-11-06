import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import { AiFillFileAdd } from 'react-icons/ai'
import axios from 'axios'
import { triggerSimpleAjax } from '../helpers/httpHelper'

export default class Categories extends Component {
  state = {
    categories: []
  }

  componentDidMount() {
    triggerSimpleAjax('examination/question-categories/', 'get').then(
      (response) => {
        this.setState({
          ...this.state,
          categories: response
        })
      }
    )
  }

  render() {
    return (
      <div className="page-container">
        <div className="container mt-5">
          <Button className="bg-dblue mb-4" href="/categories/create">
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
              {this.state.categories.map((categorie) => (
                <tr>
                  <td>{categorie.id}</td>
                  <td>{categorie.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}
