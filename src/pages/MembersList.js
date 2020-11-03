import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import { IoIosPersonAdd } from 'react-icons/io'
import { triggerSimpleAjax } from '../helpers/httpHelper'

export default class MembersList extends Component {
  state = {
    members: []
  }

  componentDidMount() {
    triggerSimpleAjax('auth/users/', 'get').then((response) => {
      this.setState({
        ...this.state,
        members: response
      })
    })
  }

  render() {
    return (
      <div className="page-container">
        <div className="container mt-5">
          <Button className="bg-dblue mb-4" href="/members/create">
            <IoIosPersonAdd /> Add New
          </Button>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {this.state.members.map((member) => (
                <tr>
                  <td>{member.id}</td>
                  <td>{member.email}</td>
                  <td>{member.first_name}</td>
                  <td>{member.last_name}</td>
                  <td>{member.username}</td>
                  <td>{member.role}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}
