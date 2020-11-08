import React, { Component } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { AuthenticatedRoute, NonAuthenticatedRoute } from './helpers/routes'
import {
  Home,
  Login,
  Page404,
  SubjectList,
  SubjectsCreate,
  ExamsList,
  ExamsCreate,
  MembersList,
  MembersCreate,
  ExaminationOverview,
  CategoriesList,
  CategoriesCreate,
  QuestionCreate,
  QuestionPaperCreate,
  QuestionPaperDetails
} from './pages/index'
import { Navibar } from './components'

export default class App extends Component {
  render() {
    return (
      <Router>
        {localStorage.getItem('auth_key', null) && <Navibar />}
        <Switch>
          <Redirect exact from="/" to="/login" />
          <NonAuthenticatedRoute exact path="/login" component={Login} />
          <AuthenticatedRoute exact path="/home" component={Home} />
          {/* subjects */}
          <AuthenticatedRoute exact path="/subjects" component={SubjectList} />
          <AuthenticatedRoute
            exact
            path="/subjects/create"
            component={SubjectsCreate}
          />
          {/* exams */}
          <AuthenticatedRoute exact path="/exams" component={ExamsList} />
          <AuthenticatedRoute
            exact
            path="/exams/create"
            component={ExamsCreate}
          />
          {/* members and users */}
          <AuthenticatedRoute exact path="/members" component={MembersList} />
          <AuthenticatedRoute
            exact
            path="/members/create"
            component={MembersCreate}
          />
          {/* examination and question papers */}
          <AuthenticatedRoute
            exact
            path="/examination/overview"
            component={ExaminationOverview}
          />
          <AuthenticatedRoute
            exact
            path="/categories"
            component={CategoriesList}
          />
          <AuthenticatedRoute
            exact
            path="/categories/create"
            component={CategoriesCreate}
          />
          <AuthenticatedRoute
            exact
            path="/questions/create"
            component={QuestionCreate}
          />
          <AuthenticatedRoute
            exact
            path="/questionpapers/create"
            component={QuestionPaperCreate}
          />
          <AuthenticatedRoute
            exact
            path="/questionpapers/details"
            component={QuestionPaperDetails}
          />
          <Route component={Page404} />
        </Switch>
      </Router>
    )
  }
}
