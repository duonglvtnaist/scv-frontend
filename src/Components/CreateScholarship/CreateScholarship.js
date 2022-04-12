import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Dropdown, Form, Icon } from 'semantic-ui-react'
import './createScholarship.css'
import { workingType } from './../Data/Data'

export default function CreateScholarship() {
  return (
    <div className="createCVContainer">
      <Container>
        <div className="createCVTitle">Upload Scholarship</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Form className="formInputCreateCV">
            <Form.Field className="formFieldCreateCV">
              <label>Scholarship ID</label>
              <input
                type="text"
                className="inputCV"
                name="scholarshipid"
              ></input>
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label>Title</label>
              <input type="text" className="inputCV" name="title" />
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label> Posted By</label>
              <input type="text" className="inputCV" name="postedby" />
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label>School</label>
              <input type="text" className="inputCV" name="school" />
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label>Type</label>
              <Dropdown
                placeholder="Type"
                fluid
                selection
                className="dropdownOption"
                options={workingType}
              ></Dropdown>
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label>Field</label>
              <Dropdown
                placeholder="Field"
                fluid
                selection
                className="dropdownOption"
                options={workingType}
              ></Dropdown>
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label>Keywords</label>
              <input type="text" className="inputCV" name="keywords" />
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label>Application Deadline</label>
              <input type="text" className="inputCV" name="keywords" />
            </Form.Field>
            <Form.Field className="formFieldCreateCV contentForm">
              <label>Description In Detail</label>
              <input
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
