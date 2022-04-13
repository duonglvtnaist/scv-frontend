import React from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Form,
  Icon,
  Radio,
  TextArea,
} from 'semantic-ui-react'
import './createJob.css'

export default function CreateJob() {
  return (
    <div className="createJobContainer">
      <Container>
        <div className="createCVTitle">Upload Job</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Form className="formInputCreateCV">
            <Form.Field className="formFieldCreateCV">
              <label>Job ID</label>
              <input type="text" className="inputCV" name="jobid"></input>
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label> Job Title</label>
              <input type="text" className="inputCV" name="jobtitle" />
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label> Posted By</label>
              <input type="text" className="inputCV" name="postedby" />
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label> Job type</label>
              <div className="formFieldGroupRadio">
                <div className="formFieldRadio">
                  <input type="radio" value="Online" name="jobtype" /> Online
                </div>
                <div className="formFieldRadio">
                  <input type="radio" value="Offline" name="jobtype" /> Offline
                </div>
              </div>
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label>Location</label>
              <input type="text" className="inputCV" name="location" />
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label>Keywords</label>
              <input type="text" className="inputCV" name="keywords" />
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label>Application Deadline</label>
              <input
                type="date"
                className="inputCV"
                name="applicationdeadline"
              />
            </Form.Field>
            <Form.Field className="formFieldCreateCV contentForm">
              <label>Content</label>
              <TextArea
                type="text"
                placeholder="Content"
                className="textContent"
              />
            </Form.Field>
          </Form>
        </div>
        <div className="buttonSavePostCV">
          <Link to="/home-page">
            <Icon name="arrow left" size="big"></Icon>
          </Link>
          <Button type="submit" className="buttonSaveCV">
            Save
          </Button>
          <Button type="submit" className="buttonPostCV">
            Post
          </Button>
        </div>
      </Container>
    </div>
  )
}
