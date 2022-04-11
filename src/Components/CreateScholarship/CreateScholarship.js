import React from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Dropdown,
  Form,
  Icon,
  Message,
  Input,
} from 'semantic-ui-react'
import { createScholarship } from '../../network/api/scholarship'
import AddTagKeyWord from '../AddTagKeyWords/AddTagKeyWord'
import { scholarshipTypes, schoolarshipFieldTypes } from './../Data/Data'
import './createScholarship.css'

export default class CreateScholarship extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scholarship: {
        scholarship_id: '',
        title: '',
        posted_by: '',
        school: '',
        scholarship_type: '',
        scholarship_field: '',
        keywords: '',
        deadline: '2022-04-07',
        description_in_detail: '',
      },
      message: {
        status: 0,
        visible: false,
        message: '',
        isError: false,
        defaultMessage: 'Something went wrong. Please try again later.',
      },
    }
    this.handleInputChange = this.handleInputChange.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)

    this.onDismiss = this.onDismiss.bind(this)
  }

  handleInputChange(event, data) {
    const target = event.target

    let name, value
    if (data?.type === 'dropdown') {
      value = data.value
      name = data.name
    } else {
      value = target.type === 'checkbox' ? target.checked : target.value
      name = target.name
    }

    const scholarship = this.state.scholarship

    // update scholarship info
    scholarship[name] = value
    this.setState({
      scholarship,
    })
  }

  async handleSubmit(event) {
    event.preventDefault()

    const res = await createScholarship(this.state.scholarship)

    if (res.status === 201) {
      this.setState({
        scholarship: {},
        message: {
          visible: true,
          status: res.status,
          message: res.message || 'Successfully created scholarship',
          isError: false,
        },
      })
    } else {
      this.setState({
        scholarship: this.state.scholarship,
        message: {
          visible: true,
          status: res.status || 501,
          message: res.message || 'Failed to create scholarship',
          isError: true,
        },
      })
    }

    this.hideMessageAfter(5000)
    return
  }

  hideMessageAfter(miliseconds) {
    const message = this.state.message
    message.visible = false
    setTimeout(() => {
      this.setState({
        message,
      })
    }, miliseconds)
  }

  onDismiss() {
    const message = this.state.message
    message.visible = false
    this.setState({
      message,
    })
  }

  render() {
    return (
      <div className="createCVContainer">
        <Container>
          <div className="createCVTitle">Upload Scholarship</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Form className="formInputCreateCV">
              <div
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginBottom: '30px',
                  marginLeft: '60px',
                  fontSize: '20px',
                }}
              >
                <Message
                  visible={this.state.message.visible}
                  success={!this.state.message.isError}
                  error={this.state.message.isError}
                  onDismiss={this.onDismiss}
                >
                  <p>
                    {this.state.message.message ||
                      this.state.message.defaultMessage}
                  </p>
                </Message>
              </div>
              <Form.Field className="formFieldCreateCV">
                <label>Scholarship ID</label>
                <input
                  type="text"
                  className="inputCV"
                  name="scholarship_id"
                  value={this.state.scholarship.scholarship_id}
                  onChange={this.handleInputChange}
                ></input>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label>Title</label>
                <input
                  type="text"
                  className="inputCV"
                  name="title"
                  value={this.state.scholarship.title}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label> Posted By</label>
                <input
                  type="text"
                  className="inputCV"
                  name="posted_by"
                  value={this.state.scholarship.posted_by}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label>School</label>
                <input
                  type="text"
                  className="inputCV"
                  name="school"
                  value={this.state.scholarship.school}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label>Type</label>
                <Dropdown
                  style={{ fontSize: '20px' }}
                  type="dropdown"
                  placeholder="Select A Type"
                  fluid
                  selection
                  className="dropdownOption"
                  name="scholarship_type"
                  value={this.state.scholarship.scholarship_field}
                  options={scholarshipTypes}
                  onChange={this.handleInputChange}
                ></Dropdown>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label>Field</label>
                <Dropdown
                  placeholder="Select A Field"
                  style={{ fontSize: '20px' }}
                  type="dropdown"
                  fluid
                  selection
                  name="scholarship_field"
                  className="dropdownOption"
                  value={this.state.scholarship.scholarship_type}
                  options={schoolarshipFieldTypes}
                  onChange={this.handleInputChange}
                ></Dropdown>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label>Keywords</label>
                <AddTagKeyWord
                  value={this.state.scholarship.keywords}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label>Application Deadline</label>
                <input
                  type="date"
                  className="inputCV"
                  id="deadline"
                  name="deadline"
                  value={this.state.scholarship.deadline}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field className="formFieldCreateCV contentForm">
                <label>Description In Detail</label>
                <input
                  type="text"
                  placeholder="Type in description"
                  className="textContent"
                  name="description_in_detail"
                  value={this.state.scholarship.description_in_detail}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
            </Form>
          </div>
          <div className="buttonSavePostCV">
            <Link to="/home">
              <Icon name="arrow left" size="big"></Icon>
            </Link>
            <Button type="submit" className="buttonSaveCV">
              Save
            </Button>
            <Button
              type="submit"
              className="buttonPostCV"
              onClick={this.handleSubmit}
            >
              Post
            </Button>
          </div>
        </Container>
      </div>
    )
  }
}
