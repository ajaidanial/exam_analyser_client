import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import { RiAddCircleFill } from 'react-icons/ri'
import axios from 'axios'
import { triggerSimpleAjax } from '../helpers/httpHelper'

export default class ExaminationOverview extends Component {
  state = {
    subjectsData: {},
    examSubjectQuestionPaperData: {},
    examsData: {}
  }

  componentDidMount() {
    triggerSimpleAjax('examination/exam-subject-overview/', 'get').then(
      (response) => {
        this.setState({
          ...this.state,
          overviewData: response
        })
        let subjectsData = {}
        let examsData = {}
        let examSubjectQuestionPaperData = {}

        for (let examIndex in response) {
          let examData = response[examIndex]
          let linkedSubjects = examData.linked_subjects
          let examID = examData.id
          examsData[examID] = examData.name
          examSubjectQuestionPaperData[examID] = {}

          for (let subjectIndex in linkedSubjects) {
            let subjectData = linkedSubjects[subjectIndex]
            let subjectID = subjectData.id

            subjectsData[subjectID] = subjectData.name
            let linkedQuestionPaper = subjectData.linked_question_paper

            if (linkedQuestionPaper)
              examSubjectQuestionPaperData[examID][
                subjectID
              ] = linkedQuestionPaper
            else examSubjectQuestionPaperData[examID][subjectID] = null
          }
        }

        console.log(subjectsData)
        this.setState({
          ...this.state,
          subjectsData: subjectsData,
          examsData: examsData,
          examSubjectQuestionPaperData: examSubjectQuestionPaperData
        })
      }
    )
  }

  render() {
    let { subjectsData, examsData, examSubjectQuestionPaperData } = this.state
    return (
      <div className="page-container">
        <div className="container mt-5">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Exam</th>
                {Object.keys(subjectsData).map((key, index) => (
                  <th>{subjectsData[key]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(examsData).map((examKey, index) => {
                let examSubjectsData = examSubjectQuestionPaperData[examKey]
                return (
                  <tr>
                    <td>{examsData[examKey]}</td>
                    {Object.keys(examSubjectsData).map((subjectKey, index) => {
                      let examSubjectQuestionPaper =
                        examSubjectsData[subjectKey]
                      return examSubjectQuestionPaper ? (
                        <td
                          className="text-danger"
                          onClick={(e) => {
                            alert(
                              'question paper id: ' +
                                examSubjectQuestionPaper.id
                            )
                          }}
                        >
                          {examSubjectQuestionPaper.name}
                        </td>
                      ) : (
                        <td
                          onClick={(e) => {
                            alert(
                              `exam id: ${examKey} subject id: ${subjectKey}`
                            )
                          }}
                        >
                          Add
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}
