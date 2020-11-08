import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import { AiFillFileAdd } from 'react-icons/ai'
import { Questioncard } from '../components/index'
import { triggerSimpleAjax } from '../helpers/httpHelper'

export default class QuestionPaperDetails extends Component {
  state = {
    questions: {}
  }

  componentDidMount() {
    triggerSimpleAjax(
      `examination/question-papers/${localStorage.getItem(
        'questionpaper_id'
      )}/?show-questions=true`,
      'get'
    ).then((response) => {
      this.setState({
        ...this.state,
        questions: response
      })
      alert('sucess')
      console.log(this.state.questions)
    })
  }

  render() {
    return (
      <div className="page-container">
        <div className="container mt-5">
          <Button className="bg-dblue mb-4" href="/questions/create">
            <AiFillFileAdd /> Add New
          </Button>
          <Questioncard {...this.state.questions} />
        </div>
      </div>
    )
  }
}
