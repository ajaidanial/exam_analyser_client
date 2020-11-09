import React, { Component } from 'react'
import { Input, AppSelect } from '../components/index'
import { Card, Button } from 'react-bootstrap'
import { triggerSimpleAjax } from '../helpers/httpHelper'

export default class SubjectsCreate extends Component {
  state = {
    inputData: {},
    errors: {},
    options: {
      subjects: []
    }
  }
  componentDidMount() {
    triggerSimpleAjax('examination/subjects/', 'get').then((response) => {
      let subjectsOptions = []
      response.map((data, index) => {
        subjectsOptions.push({
          value: data.id,
          label: data.name
        })
      })
      this.setState({
        ...this.state,
        options: {
          ...this.state.options,
          subjects: subjectsOptions
        }
      })
    })
  }

  handleChange = (e, customName = null) => {
    let value = null
    if (e !== null && 'target' in e) {
      value = e.target.value
      customName = e.target.name
    } else {
      // select field
      if (e === null) {
        value = null
      } else if ('value' in e) {
        // single select
        value = e.value
      } else {
        // multi select
        value = []
        e.map((data, index) => {
          value.push(data.value)
        })
      }
    }

    this.setState(
      {
        ...this.state,
        inputData: {
          ...this.state.inputData,
          [customName]: value
        }
      },
      () => {
        console.log(value)
      }
    )
  }

  submitHandler = () => {
    triggerSimpleAjax(
      'examination/question-categories/',
      'post',
      this.state.inputData
    )
      .then((response) => {
        alert('Successfully created subject.')
        window.location.href = '/categories'
      })
      .catch((errorResponse) => {
        this.setState({
          ...this.state,
          errors: errorResponse
        })
      })
  }

  render() {
    let { inputData, errors, options } = this.state

    return (
      <div className="page-container">
        <div className="home-container container mt-5 ">
          <Card className="shadow-lg p-3 mb-5 bg-white rounded">
            <Card.Body>
              <h4>Enter Subject Name To Create</h4>
              <Input
                type="text"
                name="name"
                placeholder="Category Name"
                value={inputData.name}
                change={this.handleChange}
                errors={errors.name || errors.non_field_errors || errors.detail}
              />
              <AppSelect
                name="subject"
                value={inputData.subject}
                change={(e) => this.handleChange(e, 'subject')}
                errors={errors.subject}
                options={options.subjects}
                multiple={false}
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
