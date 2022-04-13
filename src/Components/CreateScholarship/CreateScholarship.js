import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Dropdown,
  Form,
  Icon,
  Message
} from 'semantic-ui-react'
import * as yup from 'yup'
import { createScholarship } from '../../network/api/scholarship'
import AddTagKeyWord from '../AddTagKeyWords/AddTagKeyWord'
import { scholarshipTypes, schoolarshipFieldTypes } from './../Data/Data'
import './createScholarship.css'

export default function CreateScholarship(props) {
  const [scholarship, setScholarship] = useState({
    scholarship_id: '',
    title: '',
    posted_by: '',
    school: '',
    scholarship_type: '',
    scholarship_field: '',
    keywords: '',
    deadline: '2022-04-07',
    description_in_detail: '',
  })

  const [message, setMessage] = useState({
    status: 0,
    visible: false,
    message: '',
    isError: false,
    defaultMessage: 'Something went wrong. Please try again later.',
  })

  const validationSchema = yup.object().shape({
    value: yup.string().required('This field is required'),
  })

  const formOptions = {
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    field,
  } = useForm(formOptions)

  const handleInputChange = (event, data) => {
    const target = event.target

    let name, value
    if (data?.type === 'dropdown') {
      value = data.value
      name = data.name
    } else {
      value = target.type === 'checkbox' ? target.checked : target.value
      name = target.name
    }

    // update scholarship info
    scholarship[name] = value
    setScholarship(scholarship)
  }

  const onSumit = async (_, event) => {
    event.preventDefault()

    console.log(errors)
    const res = await createScholarship(scholarship)

    console.log(res)

    if (res.status === 201) {
      setScholarship({})
      setMessage({
        visible: true,
        status: res.status,
        message: res.message || 'Successfully created scholarship',
        isError: false,
      })
    } else {
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
                visible={message.visible}
                success={!message.isError}
                error={message.isError}
                onDismiss={onDismiss}
              >
                <p>{message.message || message.defaultMessage}</p>
              </Message>
            </div>
            <Form.Field className="formFieldCreateCV">
              <label>Scholarship ID</label>
              <input
                type="text"
                className="inputCV"
                name="scholarship_id"
                {...register('scholarship_id', { required: true })}
                onChange={handleInputChange}
              ></input>
            </Form.Field>
            {errors.scholarship_id ? (
              <div className="validate-error-message">
                <span>This field is required</span>
              </div>
            ) : null}
            <Form.Field className="formFieldCreateCV">
              <label>Title</label>
              <input
                type="text"
                className="inputCV"
                name="title"
                {...register('title', { required: true })}
                onChange={handleInputChange}
              />
            </Form.Field>
            {errors.title ? (
              <div className="validate-error-message">
                <span>This field is required</span>
              </div>
            ) : null}
            <Form.Field className="formFieldCreateCV">
              <label> Posted By</label>

              <input
                type="text"
                className="inputCV"
                name="posted_by"
                {...register('posted_by', { required: true })}
                onChange={handleInputChange}
              />
            </Form.Field>
            {errors.posted_by ? (
              <div className="validate-error-message">
                <span>This field is required</span>
              </div>
            ) : null}
            <Form.Field className="formFieldCreateCV">
              <label>School</label>
              <input
                type="text"
                className="inputCV"
                name="school"
                {...register('school', { required: true })}
                onChange={handleInputChange}
              />
            </Form.Field>
            {errors.school ? (
              <div className="validate-error-message">
                <span>This field is required</span>
              </div>
            ) : null}
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
                  options={scholarshipTypes}
                  onChange={handleInputChange}
                ></Dropdown>
            </Form.Field>

            {/* <div className="validate-error-message">
              <span>{errors.value?.message || ''}</span>
            </div> */}

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
                {...register('scholarship_field', { required: true })}
                options={schoolarshipFieldTypes}
                onChange={handleInputChange}
              ></Dropdown>
            </Form.Field>
            {/* {errors.scholarship_field ? (
              <div className="validate-error-message">
                <span>This field is required</span>
              </div>
            ) : null} */}
            <Form.Field className="formFieldCreateCV">
              <label>Keywords</label>
              <AddTagKeyWord
                {...register('keywords', { required: true })}
                onChange={handleInputChange}
              />
            </Form.Field>
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
            {errors.deadline ? (
              <div className="validate-error-message">
                <span>This field is required</span>
              </div>
            ) : null}
            <Form.Field className="formFieldCreateCV contentForm">
              <label>Description In Detail</label>
              <input
                style={{ fontSize: '20px' }}
                type="text"
                placeholder="Type in description"
                className="textContent"
                name="description_in_detail"
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
            onClick={handleSubmit(onSumit)}
          >
            Post
          </Button>
        </div>
      </Container>
    </div>
  )
}
