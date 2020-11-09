import React, { Component } from 'react'
import { Input, AppSelect } from '../components/index'
import { triggerSimpleAjax } from '../helpers/httpHelper'
import { Button } from 'react-bootstrap'

export default class QuestionCreate extends Component {
  state = {
    errors: {},
    inputData: {
      question_paper: localStorage.getItem('questionpaper_id')
    },
    options: {
      categories: []
    }
  }

  componentDidMount() {
    triggerSimpleAjax('examination/question-categories/', 'get').then(
      (response) => {
        let categorieOptions = []
        response.map((data, index) => {
          categorieOptions.push({
            value: data.id,
            label: data.name
          })
        })
        this.setState({
          ...this.state,
          options: {
            ...this.state.options,
            categories: categorieOptions
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
    triggerSimpleAjax('examination/questions/', 'post', this.state.inputData)
      .then((response) => {
        alert('Successfully created question.')
        window.location.reload()
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
        <div className="container mt-3">
          <Button className="bg-dblue" href="/questionpapers/details">
            Finish and view question paper
          </Button>
          <Input
            type="text"
            name="name"
            placeholder="name"
            value={inputData.name}
            change={(e) => this.handleChange(e)}
            errors={errors.name}
          />
          <Input
            type="text"
            name="description"
            placeholder="description"
            value={inputData.description}
            change={(e) => this.handleChange(e)}
            errors={errors.description}
          />
          <Input
            type="number"
            name="max_marks"
            placeholder="max_marks"
            value={inputData.max_marks}
            change={(e) => this.handleChange(e)}
            errors={errors.max_marks}
          />

          <AppSelect
            name="question_categories"
            value={inputData.question_categories}
            change={(e) => this.handleChange(e, 'question_categories')}
            errors={errors.question_categories}
            options={options.categories}
            multiple={true}
          />
          <Button
            className="bg-blue btn-block mt-5"
            onClick={this.submitHandler}
          >
            Submit
          </Button>
        </div>
      </div>
    )
  }
}
