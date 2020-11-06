import React, { Component } from 'react'
import { Questioncard } from '../components/index'
import { triggerSimpleAjax } from '../helpers/httpHelper'

export default class QuestionPaperList extends Component {
  state = {
    qpapers: []
  }

  componentDidMount() {
    triggerSimpleAjax('examination/questions/', 'get').then((response) => {
      this.setState({
        ...this.state,
        qpapers: response
      })
    })
  }

  render() {
    return (
      <div className="page-container">
        <div className="container">
          {this.state.qpapers.map((qpaper) => (
            <Questioncard {...qpaper} />
          ))}
        </div>
      </div>
    )
  }
}
