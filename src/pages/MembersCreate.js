import React, { Component } from 'react'
import { Input, AppSelect } from '../components/index'
import { Card, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { triggerSimpleAjax } from '../helpers/httpHelper'

export default class SubjectsCreate extends Component {
  state = {
    errors: {},
    inputData: {},
    options: {
      subjects: [],
      roles: [
        {
          value: 'teacher',
          label: 'Teacher'
        },
        {
          value: 'student',
          label: 'Student'
        }
      ]
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
                name="username"
                placeholder="Username"
                value={inputData.username}
                change={(e) => this.handleChange(e)}
                errors={
                  errors.username || errors.non_field_errors || errors.detail
                }
              />
              <Input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={inputData.first_name}
                change={(e) => this.handleChange(e)}
                errors={errors.first_name}
              />
              <Input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={inputData.last_name}
                change={(e) => this.handleChange(e)}
                errors={errors.last_name}
              />
              <Input
                type="text"
                name="email"
                placeholder="Email"
                value={inputData.email}
                change={(e) => this.handleChange(e)}
                errors={errors.email}
              />
              <AppSelect
                name="role"
                value={inputData.role}
                change={(e) => this.handleChange(e, 'role')}
                errors={errors.role}
                options={options.roles}
                multiple={false}
              />
              <AppSelect
                name="linked_subjects"
                value={inputData.linked_subjects}
                change={(e) => this.handleChange(e, 'linked_subjects')}
                errors={errors.linked_subjects}
                options={options.subjects}
                multiple={true}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={inputData.password}
                change={(e) => this.handleChange(e)}
                errors={errors.password}
              />
              <Input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={inputData.confirm_password}
                change={(e) => this.handleChange(e)}
                errors={errors.confirm_password}
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
