import React, { Component } from 'react'
import { Input, AppSelect } from '../components/index'
import { Card, Button } from 'react-bootstrap'
import { triggerSimpleAjax } from '../helpers/httpHelper'

export default class SubjectsCreate extends Component {
  state = {
    errors: {},
    inputData: {},
    options: {
      subjects: []
    }
  }

  componentDidMount() {
    let currentRole = localStorage.getItem('role', null)
    if (currentRole) {
      currentRole = JSON.parse(currentRole)
      this.setState(
        {
          ...this.state,
          currentRole: currentRole,
          inputData: {
            ...this.state.inputData,
            role: currentRole === 'admin' ? 'teacher' : 'student'
          }
        },
        () => {
          if (currentRole === 'teacher') {
            this.setState({
              ...this.state,
              inputData: {
                ...this.state.inputData,
                password: 'test',
                confirm_password: 'test'
              }
            })
          }
        }
      )
    }

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
    let { inputData } = this.state
    triggerSimpleAjax('auth/users/', 'post', {
      ...inputData,
      username: inputData.email || ''
    })
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
    let { inputData, errors, options, currentRole } = this.state

    return (
      <div className="page-container">
        <div className="home-container container mt-5 ">
          <Card className="shadow-lg p-3 mb-5 bg-white rounded">
            <Card.Body>
              {currentRole === 'admin' ? (
                <h4>Enter Details To Create A Teacher</h4>
              ) : (
                <h4>Enter Details To Create A Student</h4>
              )}

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
                errors={
                  errors.email ||
                  errors.username ||
                  errors.non_field_errors ||
                  errors.detail
                }
              />
              <AppSelect
                name="linked_subjects"
                value={inputData.linked_subjects}
                change={(e) => this.handleChange(e, 'linked_subjects')}
                errors={errors.linked_subjects}
                options={options.subjects}
                multiple={true}
              />
              {['admin'].includes(currentRole) && (
                <>
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
                </>
              )}
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
