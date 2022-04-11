import { React, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Form,
  Icon,
  Message
} from 'semantic-ui-react'
import { createJob } from '../../network/api/job'
import AddTagKeyWord from '../AddTagKeyWords/AddTagKeyWord'
import './createJob.css'

export default function JobForm() {
  const [job, setJob] = useState({
    job_id: '',
    job_title: '',
    posted_by: '',
    job_type: 'Remote',
    location: '',
    keywords: '',
    deadline: '',
    description_in_detail: '',
    category: '',
    position: '',
    experience: '',
  })

  const [message, setMessage] = useState({
    status: 0,
    visible: false,
    message: '',
    isError: false,
    defaultMessage: 'Something went wrong. Please try again later.',
  })

  let {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  watch('job_id')

  const handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    console.log(value, name)
    // update job info
    job[name] = value
    setJob(job)
    console.log(job)
  }


  const onSubmit = async (data, event) => {
    console.log(event)
    event.preventDefault()

    const res = await createJob(job)


    if (res.status === 201) {
      setJob({})
      setMessage({
        visible: true,
        status: res.status,
        message: res.message || 'Successfully created scholarship',
        isError: false,
      })
    } else {
      setJob({})
      setMessage({
        visible: true,
        status: res.status || 501,
        message: res.message || 'Failed to create scholarship',
        isError: true,
      })
    }

    hideMessageAfter(5000)
    return
  }

  const hideMessageAfter = miliseconds => {
    message.visible = false
    setTimeout(() => {
      setMessage(message)
    }, miliseconds)
  }

  const onDismiss = () => {
    message.visible = false
    setMessage(message)
  }

  const [tagKeyWords, setTagKeyWords] = useState([])

  return (
    <div className="createJobContainer">
      <Container>
        <div className="createCVTitle">Upload Job</div>
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
                visible={message.visible}
                success={!message.isError}
                error={message.isError}
                onDismiss={onDismiss}
              >
                <p>{message.message || message.defaultMessage}</p>
              </Message>
            </div>
            <Form.Field className="formFieldCreateCV">
              <label>Job ID</label>
              <input
                type="text"
                className="inputCV"
                name="job_id"
                {...register('job_id', { required: true })}
                onChange={handleInputChange}
              ></input>
            </Form.Field>
            <div className="validate-error-message">
              <span>{errors.job_id && 'This field is required'}</span>
            </div>

            <Form.Field className="formFieldCreateCV">
              <label> Job Title</label>
              <input
                type="text"
                className="inputCV"
                name="job_title"
                {...register('job_title', { required: true })}
                onChange={handleInputChange}
              />
            </Form.Field>
            <div className="validate-error-message">
              <span>{errors.job_title && 'This field is required'}</span>
            </div>
            <Form.Field className="formFieldCreateCV">
              <label> Job type</label>
              <div className="formFieldGroupRadio">
                <div className="formFieldRadio">
                  <input
                    type="radio"
                    id="job_type"
                    name="job_type"
                    value="Remote"
                    {...register('job_type', { required: true })}
                    onChange={handleInputChange}
                  />{' '}
                  Remote
                </div>
                <div className="formFieldRadio">
                  <input
                    type="radio"
                    id="job_type"
                    name="job_type"
                    value="On site"
                    {...register('job_type', { required: true })}
                    onChange={handleInputChange}
                  />{' '}
                  On site
                </div>
              </div>
            </Form.Field>
            <div className="validate-error-message">
              <span>{errors.job_type && 'This field is required'}</span>
            </div>
            <Form.Field className="formFieldCreateCV">
              <label>Category</label>
              <input
                type="text"
                className="inputCV"
                name="category"
                {...register('category', { required: true })}
                onChange={handleInputChange}
              />
            </Form.Field>
            <div className="validate-error-message">
              <span>{errors.category && 'This field is required'}</span>
            </div>
            <Form.Field className="formFieldCreateCV">
              <label>Experience</label>
              <input
                type="text"
                className="inputCV"
                name="experience"
                {...register('experience', { required: true })}
                onChange={handleInputChange}
              />
            </Form.Field>
            <div className="validate-error-message">
              <span>{errors.experience && 'This field is required'}</span>
            </div>
            <Form.Field className="formFieldCreateCV">
              <label>Position</label>
              <input
                type="text"
                className="inputCV"
                name="position"
                {...register('position', { required: true })}
                onChange={handleInputChange}
              />
            </Form.Field>
            <div className="validate-error-message">
              <span>{errors.position && 'This field is required'}</span>
            </div>
            <Form.Field className="formFieldCreateCV">
              <label>Location</label>
              <input
                type="text"
                className="inputCV"
                name="location"
                {...register('location', { required: true })}
                onChange={handleInputChange}
              />
            </Form.Field>
            <div className="validate-error-message">
              <span>{errors.location && 'This field is required'}</span>
            </div>
            <Form.Field className="formFieldCreateCV">
              <label>Keywords</label>
              <AddTagKeyWord
                {...register('keywords', { required: true })}
                onChange={handleInputChange}
              />
            </Form.Field>
            <div className="validate-error-message">
              <span>{errors.keywords && 'This field is required'}</span>
            </div>
            <Form.Field className="formFieldCreateCV">
              <label>Application Deadline</label>
              <input
                type="date"
                className="inputCV"
                id="deadline"
                name="deadline"
                {...register('deadline', { required: true })}
                onChange={handleInputChange}
              />
            </Form.Field>
            <div className="validate-error-message">
              <span>{errors.deadline && 'This field is required'}</span>
            </div>
            <Form.Field className="formFieldCreateCV">
              <label> Posted By</label>
              <input
                type="text"
                className="inputCV"
                id="posted_by"
                name="posted_by"
                {...register('posted_by', { required: true })}
                onChange={handleInputChange}
              />
            </Form.Field>
            <div className="validate-error-message">
              <span>{errors.posted_by && 'This field is required'}</span>
            </div>
            <Form.Field className="formFieldCreateCV contentForm">
              <label>Content</label>
              <input
                type="text"
                placeholder="Content"
                className="textContent"
                id="content"
                name="description_in_detail"
                {...register('description_in_detail', { required: false })}
                onChange={handleInputChange}
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
            onClick={handleSubmit(onSubmit)}
          >
            Post
          </Button>
        </div>
      </Container>
    </div>
  )
}
