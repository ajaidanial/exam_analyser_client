import React, { Component, Button } from 'react'
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
          <Button className="bg-dblue mb-4" href="/questionpapers/create">
            Add New
          </Button>
          {this.state.qpapers.map((qpaper) => (
            <Questioncard {...qpaper} />
          ))}
        </div>
      </div>
    )
  }
}
