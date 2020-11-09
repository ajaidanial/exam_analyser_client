import React, { Component } from 'react'
import { Button, Card, Table, Form } from 'react-bootstrap'
import { AiFillFileAdd } from 'react-icons/ai'
import { triggerSimpleAjax } from '../helpers/httpHelper'

export default class QuestionPaperDetails extends Component {
  state = {
    questionPaperData: {},
    questionsData: [],
    usersReport: [],
    isLoading: true,
    errors: {}
  }

  componentDidMount() {
    if (localStorage.getItem('questionpaper_id', null) === null) {
      window.location.href = '/'
    }

    triggerSimpleAjax(
      `examination/question-papers/${localStorage.getItem(
        'questionpaper_id'
      )}/?show-questions=true`,
      'get'
    ).then((response) => {
      this.setState(
        {
          ...this.state,
          questionPaperData: response,
          questionsData: response.related_questions,
          isLoading: false
        },
        () => {
          triggerSimpleAjax(
            `examination/question-papers/${localStorage.getItem(
              'questionpaper_id'
            )}/?show-user-report=true`
          ).then((response) => {
            this.setState({
              ...this.state,
              usersReport: response.users_report || []
            })
          })
        }
      )
    })
  }

  handleFileChange = (e) => {
    const file = e.target.files[0]
    let formData = new FormData()
    formData.append('file', file)
    alert(`Please Wait, uploading and handling file ${file.name}`)
    triggerSimpleAjax(
      `examination/marks-upload/?question_paper_id=${localStorage.getItem(
        'questionpaper_id'
      )}`,
      'post',
      formData,
      {},
      { 'Content-Type': 'multipart/form-data' }
    )
      .then((response) => {
        alert('Successfully updated the marks.')
        window.location.reload()
      })
      .catch((errors) => {
        this.setState({
          ...this.state,
          errors: errors
        })
      })
  }

  getUploadHelpFile = () => {
    triggerSimpleAjax(
      `examination/marks-upload/?question_paper_id=${localStorage.getItem(
        'questionpaper_id'
      )}`,
      'get'
    ).then((response) => {
      window.open(response.url, '_blank')
    })
  }

  render() {
    let {
      questionPaperData,
      questionsData,
      isLoading,
      usersReport,
      errors
    } = this.state
    return (
      <div className="page-container">
        <div className="container mt-5 mb-4">
          <Button className="bg-dblue mb-4" href="/examination/overview">
            <AiFillFileAdd /> Back To Overview
          </Button>
          <Button
            className="mb-4 ml-3"
            variant="warning"
            onClick={this.getUploadHelpFile}
          >
            Get Marks Upload File
          </Button>
          <Button
            className="mb-4 ml-3"
            variant="secondary"
            href="/questions/create"
          >
            Add More Questions
          </Button>
          <Card className="shadow-lg p-3 mb-4 bg-white rounded">
            <Card.Header>
              {questionPaperData.name}
              <Card.Text>{questionPaperData.description}</Card.Text>
            </Card.Header>
            <Card.Body>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <h6 className="text-warning">Questions:</h6>
              )}
              {questionsData.map((data, index) => (
                <div className="border p-2 my-2">
                  <Card.Text>
                    Q.NO: {index + 1} | Max Marks: {data.max_marks}
                  </Card.Text>
                  <Card.Text className="text-primary">{data.name}</Card.Text>
                  <Card.Text className="text-muted">
                    {data.description}
                  </Card.Text>
                </div>
              ))}
            </Card.Body>
          </Card>

          {isLoading || (
            <>
              <Card className="mb-3 p-3">
                <Form.Group>
                  <Form.File
                    className="position-relative"
                    required
                    name="file"
                    label="Upload & Update Marks"
                    onChange={this.handleFileChange}
                    isInvalid={!!errors.file}
                    feedback={errors.file}
                  />
                </Form.Group>
              </Card>
              <Table
                className="bg-white shadow"
                striped
                bordered
                hover
                responsive
              >
                <thead>
                  <tr>
                    <th>User Name</th>
                    {questionsData.map((data, index) => (
                      <th>Q.NO {index + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {usersReport.map((data, index) => (
                    <tr>
                      <td>{data.name}</td>
                      {questionsData.map((questionData, index) => (
                        <td>{data[index]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </div>
      </div>
    )
  }
}
