import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import { AiFillFileAdd } from 'react-icons/ai'
import { Questioncard } from '../components/index'
import { triggerSimpleAjax } from '../helpers/httpHelper'

export default class QuestionPaperDetails extends Component {
  state = {
    questions: [],
  }

  componentDidMount() {
    triggerSimpleAjax(
      'examination/question-papers/`${localStorage.getItem('questionpaper_id')}`/?show-questions=true',
      'get'
    ).then((response) => {
      this.setState({
        ...this.state,
        questions: response
      })
    })
  }

  render() {
    return (
      <div className="page-container">
        <div className="container mt-5">
          <Button className="bg-dblue mb-4" href="/questions/create">
            <AiFillFileAdd /> Add New
          </Button>
          {this.state.questions.map((question) => (
            <tr>
              <td>{question.description}</td>
              <td>{question.name}</td>
              <td>{question.exam}</td>
              <td>{question.subject}</td>
            </tr>
          ))}
        </div>
      </div>
    )
  }
}
