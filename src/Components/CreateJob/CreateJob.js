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

    const job = this.state.job
    job[name] = value;
    console.log(value)
    this.setState({
      
      job
      
    });

    console.log(this.state.job)

  }

  async handleSubmit(event){
    event.preventDefault();
    
    const res = await createJob(this.state.job);

    console.log(res);

    if (res.status === 201) {
      alert("Create Job Successfully");
    }else {
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
                <input type="text" className="inputCV" name="job_id" value={this.state.job_id} onChange={this.handleInputChange}></input>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label> Job Title</label>
                <input type="text" className="inputCV" name="job_title" value={this.state.job_title} onChange={this.handleInputChange}/>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label> Job type</label>
                <div className="formFieldGroupRadio">
                  <div className="formFieldRadio">
                    <input type="radio" id="job_type" name="job_type" value="Remote" onChange={this.handleInputChange}/> Remote
                  </div>
                  <div className="formFieldRadio">
                    <input type="radio" id="job_type" name="job_type" value="On site" onChange={this.handleInputChange}/> On site
                  </div>
                </div>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label>Category</label>
                <input type="text" className="inputCV" name="category" value={this.state.category} onChange={this.handleInputChange}/>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label>Experience</label>
                <input type="text" className="inputCV" name="experience" value={this.state.experience} onChange={this.handleInputChange}/>
              </Form.Field>
              <Form.Field className="formFieldCreateCV">
                <label>Position</label>
                <input type="text" className="inputCV" name="position" value={this.state.position} onChange={this.handleInputChange}/>
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
              <Form.Field className="formFieldCreateCV">
                <label> Posted By</label>
                <input type="text" className="inputCV" id="posted_by" name="posted_by" value={this.state.posted_by} onChange={this.handleInputChange}/>
              </Form.Field>
              <Form.Field className="formFieldCreateCV contentForm">
                <label>Content</label>
                <input
                  type="text"
                  placeholder="Content"
                  className="textContent"
                  id="content"
                  name="description_in_detail"
                  value={this.state.description_in_detail} onChange={this.handleInputChange}
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

   errorFallback(res) {
    alert(res.data.message);
    return (
      
      <div role="alert">
        
        {/* <p>Something went wrong:</p> */}
        {/* <pre>{error.message}</pre> */}
      </div>
    )
  }
  
}
