import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { RiBookOpenFill, RiLoginBoxLine } from 'react-icons/ri'
import { Input } from '../components/index'
import { Navbar } from 'react-bootstrap'
import axios from 'axios'
import { triggerSimpleAjax } from '../helpers/httpHelper'

export default class Login extends Component {
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
    triggerSimpleAjax('auth/get-auth-token/', 'post', this.state.inputData)
      .then((response) => {
        localStorage.setItem('auth_key', response.token)
        localStorage.setItem('user_data', JSON.stringify(response.user_data))
        alert('Successfully signed in user.')
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
    let { inputData, errors } = this.state

    return (
      <div className="login-container text-capitalise">
        {/* navbar  */}
        <Navbar bg="light bg-dblue" className="d-sm-block d-lg-none">
          <Navbar.Brand href="#home" className="text-white">
            SRCG
          </Navbar.Brand>
        </Navbar>
        {/* row */}
        <div className="row">
          {/* left container */}
          <div className="login-left-container col-lg-6 d-none d-lg-block">
            <h2 className="text-white left-text">
              Student report card Generator
            </h2>
            <h1>
              <RiBookOpenFill className="text-white" />
            </h1>
          </div>
          {/* right container */}
          <div className="login-right-container col-lg-6">
            <div className="main-container">
              <div className="field-container">
                <h1>
                  <RiLoginBoxLine className="txt-grey" />
                </h1>
                <h3 className="txt-blue">Login</h3>
                <Input
                  type="text"
                  placeholder="ramu@gmail.com"
                  name="username"
                  value={inputData.username}
                  change={this.handleChange}
                  errors={
                    errors.username || errors.non_field_errors || errors.detail
                  }
                />
                <Input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={inputData.password}
                  change={this.handleChange}
                  errors={errors.password}
                />
                <Button
                  className="bg-blue btn-block mt-5"
                  onClick={this.submitHandler}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
