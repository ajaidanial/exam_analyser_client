import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select'

export default class AppSelect extends Component {
  render() {
    let {
      name,
      change,
      value,
      errors = null,
      options = [],
      multiple = false
    } = this.props

    return (
      <div className="input-container mt-5">
        <Form.Group>
          <Form.Label>{name}</Form.Label>
          <Select
            isMulti={multiple}
            onChange={change}
            name={name}
            options={options}
          />
          {errors && <p className="text-danger">{errors}</p>}
        </Form.Group>
      </div>
    )
  }
}
