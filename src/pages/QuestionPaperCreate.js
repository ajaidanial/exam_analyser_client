import React, { Component } from 'react'
import { Input, AppSelect } from '../components/index'
import { Card, Button } from 'react-bootstrap'
import { triggerSimpleAjax } from '../helpers/httpHelper'

export default class SubjectsCreate extends Component {
  state = {
    errors: {},
    inputData: {},
    options: {
      categories: []
    }
  }

  componentDidMount() {
    triggerSimpleAjax('examination/question-categories/', 'get').then(
      (response) => {
        let categoriesOptions = []
        response.map((data, index) => {
          categoriesOptions.push({
            value: data.id,
            label: data.name
          })
        })
        this.setState({
          ...this.state,
          options: {
            ...this.state.options,
            categories: categoriesOptions
          }
        })
      }
    )
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
    triggerSimpleAjax('auth/users/', 'post', this.state.inputData)
      .then((response) => {
        alert('Successfully created member.')
        window.location.href = '/members'
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
              <h4>Enter Details To Create A Member</h4>

              <Input
                type="text"
                name="name"
                placeholder="question name"
                value={inputData.name}
                change={(e) => this.handleChange(e)}
                errors={errors.name || errors.non_field_errors || errors.detail}
              />
              <Input
                type="text"
                name="description"
                placeholder="description"
                value={inputData.description}
                change={(e) => this.handleChange(e)}
                errors={errors.description}
              />
              <AppSelect
                name="linked_categories"
                value={inputData.question_categories}
                change={(e) => this.handleChange(e, 'question_categories')}
                errors={errors.question_categories}
                options={options.categories}
                multiple={true}
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
