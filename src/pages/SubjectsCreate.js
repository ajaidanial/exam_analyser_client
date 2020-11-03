import React, { Component } from 'react'
import { Input } from '../components/index'
import { Card, Button } from 'react-bootstrap'
import { triggerSimpleAjax } from '../helpers/httpHelper'

export default class SubjectsCreate extends Component {
  state = {
    inputData: {},
    errors: {}
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      inputData: {
        ...this.state.inputData,
        [e.target.name]: e.target.value
      }
    })
  }

  submitHandler = () => {
    triggerSimpleAjax('examination/subjects/', 'post', this.state.inputData)
      .then((response) => {
        alert('Successfully created subject.')
        window.location.href = '/subjects'
      })
      .catch((errorResponse) => {
        this.setState({
          ...this.state,
          errors: errorResponse
        })
      })
  }

  render() {
    let { inputData, errors } = this.state

    return (
      <div className="page-container">
        <div className="home-container container mt-5 ">
          <Card className="shadow-lg p-3 mb-5 bg-white rounded">
            <Card.Body>
              <h4>Enter Subject Name To Create</h4>
              <Input
                type="text"
                name="name"
                placeholder="Subject Name"
                value={inputData.name}
                change={this.handleChange}
                errors={errors.name || errors.non_field_errors || errors.detail}
              />
            </Card.Body>
            <Button
              className="bg-blue btn-block mt-5"
              onClick={this.submitHandler}
            >
              Submit
            </Button>
          </Card>
        </div>
      </div>
    )
  }
}
