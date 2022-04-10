import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Form, Icon } from 'semantic-ui-react'
import './createCV.css'

export default function CreateCV() {
  return (
    <div className="createCVContainer">
      <Container>
        <div className="createCVTitle">Create CV</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Form className="formInputCreateCV">
            <Form.Field className="formFieldCreateCV">
              <label>CVID</label>
              <input type="text" className="inputCV" name="cvid"></input>
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label> Submitter ID</label>
              <input type="text" className="inputCV" name="submitterid" />
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label> Owner ID</label>
              <input type="text" className="inputCV" name="ownerid" />
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label> Type</label>
              <input type="text" className="inputCV" name="type" />
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label> Time Orgdate</label>
              <input type="date" className="inputCV" name="datestart" />
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label> Time expdate</label>
              <input type="date" className="inputCV" name="dateend" />
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label>Issued Day</label>
              <input type="text" className="inputCV" name="issuedday" />
            </Form.Field>
            <Form.Field className="formFieldCreateCV">
              <label>Keywords</label>
              <input type="text" className="inputCV" name="keywords" />
            </Form.Field>
            <Form.Field className="formFieldCreateCV contentForm">
              <label>Content</label>
              <input
                type="text"
                placeholder="Content"
                className="textContent"
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
          <Button type="submit" className="buttonPostCV">
            Post
          </Button>
        </div>
      </Container>
    </div>
  )
}
