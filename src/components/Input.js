import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

export default class Input extends Component {
  render() {
    let { type, placeholder, name, change, value, errors = null } = this.props

    return (
      <div className="input-container mt-5">
        <Form.Group>
          <Form.Label>{name}</Form.Label>
          <Form.Control
            type={type}
            placeholder={placeholder}
            onChange={change}
            value={value}
            name={name}
          />
          {errors && <p className="text-danger">{errors}</p>}
        </Form.Group>
      </div>
    )
  }
}
