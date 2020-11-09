import React, { Component } from 'react'
import { Input } from '../components/index'
import { Card, Button } from 'react-bootstrap'
import { triggerSimpleAjax } from '../helpers/httpHelper'

export default class SubjectsCreate extends Component {
  state = {
    errors: {},
    inputData: {
      exam: localStorage.getItem('exam_id'),
      subject: localStorage.getItem('subject_id')
    }
  }

  componentDidMount() {
    if (
      localStorage.getItem('exam_id', null) === null ||
      localStorage.getItem('subject_id', null) === null
    ) {
      window.location.href = '/'
    }
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
      'examination/question-papers/?show-questions=true',
      'post',
      this.state.inputData
    )
      .then((response) => {
        alert(
          'Successfully created a question paper. Now create questions under the question paper.'
        )
        localStorage.setItem('questionpaper_id', response.id)
        window.location.href = '/questions/create'
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
              <h4>Enter Details To Create A Question Paper</h4>

              <Input
                type="text"
                name="name"
                placeholder="question paper name"
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
