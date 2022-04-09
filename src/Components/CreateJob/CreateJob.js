import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, Icon, Message } from 'semantic-ui-react';
import { createJob } from '../../network/api/job';
import './createJob.css';

export default class JobForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: {
        job_id: "",
        job_title: "",
        posted_by: "",
        job_type: "Remote",
        location: "",
        keywords: "",
        deadline: "",
        description_in_detail: "",
        category: "",
        position: "",
        experience: "",

      }, 
      
      message: {
        status: 0,
        visible: false,
        message: '',
        isError: false,
        defaultMessage: 'Something went wrong. Please try again later.'
      }
      
    };
    this.handleInputChange = this.handleInputChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.onDismiss = this.onDismiss.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const job = this.state.job;

    // update job info
    job[name] = value;
    this.setState({
      
      job
      
    });

  }

  async handleSubmit(event){
    event.preventDefault();
    
    const res = await createJob(this.state.job);

    if (res.status === 201) {
      this.setState({
        job: {},
        message: {
          visible: true,
          status: res.status,
          message: res.message || 'Successfully created scholarship',
          isError: false,
        }
      })
    }else {
      this.setState({
        scholarship: this.state.scholarship,
        message: {
          visible: true,
          status: res.status || 501,
          message: res.message || 'Failed to create scholarship',
          isError: true,
        }
      })
    }

    this.hideMessageAfter(5000);
    return
  }

  hideMessageAfter(miliseconds) {
    const message = this.state.message;
    message.visible = false;
    setTimeout(() => {

      this.setState({
        message
      })
    }, miliseconds);
  }

  onDismiss() {
    const message = this.state.message;
    message.visible = false;
    this.setState({
      message
    })
    
  }
  
  render () {
    
    return (
      <div className="createJobContainer">
        <Container>
          <div className="createCVTitle">Upload Job</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Form className="formInputCreateCV" >
              <div style={{ width: '100%', justifyContent: 'center', marginBottom:'30px', marginLeft:'60px', fontSize:'20px' }}>
                <Message visible={this.state.message.visible} success={!this.state.message.isError} error={this.state.message.isError} onDismiss={this.onDismiss}>
                  <p>{this.state.message.message || this.state.message.defaultMessage}</p>
                </Message>
              </div>
              <Form.Field className="formFieldCreateCV">
                <label>Job ID</label>
                <input type="text" className="inputCV" name="job_id" value={this.state.job.job_id} onChange={this.handleInputChange}></input>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label> Job Title</label>
                <input type="text" className="inputCV" name="job_title" value={this.state.job.job_title} onChange={this.handleInputChange}/>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label> Job type</label>
                <div className="formFieldGroupRadio">
                  <div className="formFieldRadio">
                    <input type="radio" id="job_type" name="job_type" value="Remote" checked={this.state.job.job_type === "Remote"} onChange={this.handleInputChange}/> Remote
                  </div>
                  <div className="formFieldRadio">
                    <input type="radio" id="job_type" name="job_type" value="On site" checked={this.state.job.job_type === "On site"} onChange={this.handleInputChange}/> On site
                  </div>
                </div>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label>Category</label>
                <input type="text" className="inputCV" name="category" value={this.state.job.category} onChange={this.handleInputChange}/>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label>Experience</label>
                <input type="text" className="inputCV" name="experience" value={this.state.job.experience} onChange={this.handleInputChange}/>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label>Position</label>
                <input type="text" className="inputCV" name="position" value={this.state.job.position} onChange={this.handleInputChange}/>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label>Location</label>
                <input type="text" className="inputCV" name="location" value={this.state.job.location} onChange={this.handleInputChange}/>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label>Keywords</label>
                <input type="text" className="inputCV" name="keywords" value={this.state.job.keywords} onChange={this.handleInputChange}/>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label>Application Deadline</label>
                <input
                  type="date"
                  className="inputCV"
                  id="deadline"
                  name="deadline"
                  value={this.state.job.deadline} onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label> Posted By</label>
                <input type="text" className="inputCV" id="posted_by" name="posted_by" value={this.state.job.posted_by} onChange={this.handleInputChange}/>
              </Form.Field>
              <Form.Field className="formFieldCreateCV contentForm">
                <label>Content</label>
                <input
                  type="text"
                  placeholder="Content"
                  className="textContent"
                  id="content"
                  name="description_in_detail"
                  value={this.state.job.description_in_detail} onChange={this.handleInputChange}
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
            <Button type="submit" className="buttonPostCV" onClick={this.handleSubmit}>
              Post
            </Button>
          </div>
        </Container>
      </div>
    )
  
  }
  
}
