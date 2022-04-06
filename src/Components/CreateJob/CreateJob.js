import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, Icon } from 'semantic-ui-react';
import { createJob } from '../../network/api/job';
import './createJob.css';

export default class JobForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: {
        jobId: '',
        jobTitle: '',
        postedBy: '',
        jobType: 'Remote',
        location: '',
        keywords: [],
        deadLine: '',
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.errorFallback = this.errorFallback.bind(this);
  }

  handleInputChange(event) {

    const target = event.target;

    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      job: {
        [name]: value
      }
      
    });

  }

  async handleSubmit(event){
    event.preventDefault();
    
    const res = await createJob(this.state.job);

    console.log(res);

    if (res.status !== 200) {
      this.errorFallback(res);
    }
  }
  
  render () {
    
    return (
      <div className="createJobContainer">
        <Container>
          <div className="createCVTitle">Upload Job</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Form className="formInputCreateCV" >
              <Form.Field className="formFieldCreateCV">
                <label>Job ID</label>
                <input type="text" className="inputCV" name="jobId" value={this.state.jobId} onChange={this.handleInputChange}></input>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label> Job Title</label>
                <input type="text" className="inputCV" name="jobTitle" value={this.state.jobTitle} onChange={this.handleInputChange}/>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label> Posted By</label>
                <input type="text" className="inputCV" name="postedBy" value={this.state.postedBy} onChange={this.handleInputChange}/>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label> Job type</label>
                <div className="formFieldGroupRadio">
                  <div className="formFieldRadio">
                    <input type="radio" value="Remote" name="jobType" checked={this.state.jobType === "Remote"} onChange={this.handleInputChange}/> Remote
                  </div>
                  <div className="formFieldRadio">
                    <input type="radio" value="On site" name="jobType" checked={this.state.jobType === "On site"} onChange={this.handleInputChange}/> On site
                  </div>
                </div>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label>Location</label>
                <input type="text" className="inputCV" name="location" value={this.state.location} onChange={this.handleInputChange}/>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label>Keywords</label>
                <input type="text" className="inputCV" name="keywords" value={this.state.keywords} onChange={this.handleInputChange}/>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label>Application Deadline</label>
                <input
                  type="date"
                  className="inputCV"
                  id="deadline"
                  name="deadline"
                  value={this.state.deadline} onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field className="formFieldCreateCV contentForm">
                <label>Content</label>
                <input
                  type="text"
                  placeholder="Content"
                  className="textContent"
                  id="content"
                  name="content"
                  value={this.state.content} onChange={this.handleInputChange}
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
            <Button type="submit" className="buttonPostCV" onClick={this.handleSubmit}>
              Post
            </Button>
          </div>
        </Container>
      </div>
    )
  
  }

   errorFallback({error, componentStack, resetErrorBoundary}) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
      </div>
    )
  }
  
}
