import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
export default class Navibar extends Component {
  state = {
    role: null
  }

  componentDidMount() {
    let user_data = localStorage.getItem('user_data', null)
    if (user_data) {
      this.setState({
        ...JSON.parse(user_data)
      })
    }
  }

  render() {
    let { role } = this.state
    return (
      <Navbar bg="light bg-dblue" expand="lg">
        <Navbar.Brand href="/home">SRCG</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/home">Home</Nav.Link>

            {role === 'admin' && (
              <>
                <Nav.Link href="/members">Teachers</Nav.Link>
              </>
            )}

            {role === 'teacher' && (
              <>
                <Nav.Link href="/subjects">Subjects</Nav.Link>
                <Nav.Link href="/categories">Categories</Nav.Link>
                <Nav.Link href="/exams">Exams</Nav.Link>
                <Nav.Link href="/members">Students</Nav.Link>
                <Nav.Link href="/examination/overview">Examination</Nav.Link>
              </>
            )}

            <Nav.Link
              onClick={(e) => {
                localStorage.removeItem('auth_key')
                window.location.reload()
              }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
