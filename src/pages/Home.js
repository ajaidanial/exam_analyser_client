import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { triggerSimpleAjax } from '../helpers/httpHelper'

export default class Home extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    triggerSimpleAjax('examination/dashboard-insights/', 'get').then(
      (response) => {
        this.setState({
          ...this.state,
          data: response
        })
      }
    )
  }
  render() {
    return (
      <div className="page-container">
        <div className="m-4">
          <div className="row">
            {this.state.data.map((data, index) => (
              <div className="col-md-3 p-2">
                <Card className="p-3 shadow">
                  <Card.Title className="text-primary">
                    {data.display_name}
                  </Card.Title>
                  <Card.Title>{data.value}</Card.Title>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
