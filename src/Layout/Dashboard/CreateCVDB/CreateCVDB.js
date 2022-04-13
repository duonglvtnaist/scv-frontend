// import React from 'react'
import './updateCV.css'
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard'
import { useSubstrateState } from '../../../substrate-lib'
import imgCV from '../../../assets/Image/img1.png'
import React, { useState, useEffect, createRef } from 'react'
import {
  Grid,
  Segment,
  Input,
  Form,
  Button,
  TextArea,
  Image,
  Icon,
  Container,
  Menu,
  Label,
  Checkbox,
  Dropdown,
  Dimmer,
  Loader,
  Message,
  SegmentGroup,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import AccountMain from '../../../Components/CreateCV/AccountMain'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import { TxButton, TxGroupButton } from '../../../substrate-lib/components'

const argIsOptional = arg => arg.type.toString().startsWith('Option<')

export default function CreateCVDB() {
  const { api, jsonrpc } = useSubstrateState()
  const [status, setStatus] = useState(null)

  const [interxType, setInterxType] = useState('EXTRINSIC')
  const [palletRPCs, setPalletRPCs] = useState([])
  const [callables, setCallables] = useState([])
  const [paramFields, setParamFields] = useState([])

  const [inforDebugMes, setInforDebugMes] = useState('Initital value')

  const initFormState = {
    palletRpc: 'cv',
    callable: 'createItem',
    inputParams: [],
  }

  const [formState, setFormState] = useState(initFormState)
  const { palletRpc, callable, inputParams } = formState

  const getApiType = (api, interxType) => {
    if (interxType === 'QUERY') {
      return api.query
    } else if (interxType === 'EXTRINSIC') {
      return api.tx
    } else if (interxType === 'RPC') {
      return api.rpc
    } else {
      return api.consts
    }
  }
  const indMetaProf = 1
  const indMetaEmpl = 2
  const indMetaEdu = 3
  const indMetaRef = 4
  const indMetaType = 5

  const metaDataLabels = {
    profile: 'Profile',
    employment_history: 'Employment History',
    education: 'Education',
    references: 'References',
    type: 'Type',
  }
  const initMetaDataInputs = {
    profile: '',
    employment_history: '',
    education: '',
    references: '',
    type: '',
  }
  const [metaDataInputs, setMetaInputs] = useState(initMetaDataInputs)
  const updatePalletRPCs = () => {
    if (!api) {
      return
    }
    const apiType = getApiType(api, interxType)
    const palletRPCs = Object.keys(apiType)
      .sort()
      .filter(pr => Object.keys(apiType[pr]).length > 0)
      .map(pr => ({ key: pr, value: pr, text: pr }))
    setPalletRPCs(palletRPCs)
  }

  const updateCallables = () => {
    if (!api || palletRpc === '') {
      return
    }
    const callables = Object.keys(getApiType(api, interxType)[palletRpc])
      .sort()
      .map(c => ({ key: c, value: c, text: c }))
    setCallables(callables)
  }

  const updateParamFields = () => {
    if (!api || palletRpc === '' || callable === '') {
      setParamFields([])
      return
    }

    let paramFields = []

    if (interxType === 'QUERY') {
      const metaType = api.query[palletRpc][callable].meta.type
      if (metaType.isPlain) {
        // Do nothing as `paramFields` is already set to []
      } else if (metaType.isMap) {
        paramFields = [
          {
            name: metaType.asMap.key.toString(),
            type: metaType.asMap.key.toString(),
            optional: false,
          },
        ]
      } else if (metaType.isDoubleMap) {
        paramFields = [
          {
            name: metaType.asDoubleMap.key1.toString(),
            type: metaType.asDoubleMap.key1.toString(),
            optional: false,
          },
          {
            name: metaType.asDoubleMap.key2.toString(),
            type: metaType.asDoubleMap.key2.toString(),
            optional: false,
          },
        ]
      }
    } else if (interxType === 'EXTRINSIC') {
      const metaArgs = api.tx[palletRpc][callable].meta.args

      if (metaArgs && metaArgs.length > 0) {
        paramFields = metaArgs.map(arg => ({
          name: arg.name.toString(),
          type: arg.type.toString(),
          optional: argIsOptional(arg),
        }))
      }
    } else if (interxType === 'RPC') {
      let metaParam = []

      if (jsonrpc[palletRpc] && jsonrpc[palletRpc][callable]) {
        metaParam = jsonrpc[palletRpc][callable].params
      }

      if (metaParam.length > 0) {
        paramFields = metaParam.map(arg => ({
          name: arg.name,
          type: arg.type,
          optional: arg.isOptional || false,
        }))
      }
    } else if (interxType === 'CONSTANT') {
      paramFields = []
    }

    setParamFields(paramFields)
  }

  useEffect(updatePalletRPCs, [api, interxType])
  useEffect(updateCallables, [api, interxType, palletRpc])
  useEffect(updateParamFields, [api, interxType, palletRpc, callable, jsonrpc])

  const onPalletCallableParamChange = (_, data) => {
    setFormState(formState => {
      let res
      const { state, value } = data
      if (typeof state === 'object') {
        // Input parameter updated
        const {
          ind,
          paramField: { type },
        } = state
        const inputParams = [...formState.inputParams]

        inputParams[ind] = { type, value }
        res = { ...formState, inputParams }
      } else if (state === 'palletRpc') {
        res = { ...formState, [state]: value, callable: '', inputParams: [] }
      } else if (state === 'callable') {
        res = { ...formState, [state]: value, inputParams: [] }
      }
      return res
    })

    setInforDebugMes(JSON.stringify(formState))
  }

  const handleDateChange = (_, data) => {
    setFormState(formState => {
      let res
      const { state, value } = data

      const {
        ind,
        paramField: { type },
      } = state
      const inputParams = [...formState.inputParams]
      const date = new Date(value).getTime()
      inputParams[ind] = { type, value: date.toString() }
      res = { ...formState, inputParams }
      setInforDebugMes(inputParams[ind].value)
      return res
    })
  }
  const onMetaDataChange = (_, data) => {
    const { state, value } = data
    const inputParams = [...formState.inputParams]
    setInforDebugMes('Changing Meta')
    if (state === indMetaProf) {
      setMetaInputs({
        profile: value,
        employment_history: metaDataInputs.employment_history,
        education: metaDataInputs.education,
        references: metaDataInputs.references,
        type: metaDataInputs.type,
      })
      setInforDebugMes('Changing Prof')
    } else if (state === indMetaEmpl) {
      setMetaInputs({
        profile: metaDataInputs.profile,
        employment_history: value,
        education: metaDataInputs.education,
        references: metaDataInputs.references,
        type: metaDataInputs.type,
      })
      setInforDebugMes('Changing Emp')
    } else if (state === indMetaEdu) {
      setMetaInputs({
        profile: metaDataInputs.profile,
        employment_history: metaDataInputs.employment_history,
        education: value,
        references: metaDataInputs.references,
        type: metaDataInputs.type,
      })
      setInforDebugMes('Changing Edu')
    } else if (state === indMetaRef) {
      setMetaInputs({
        profile: metaDataInputs.profile,
        employment_history: metaDataInputs.employment_history,
        education: metaDataInputs.education,
        references: value,
        type: metaDataInputs.type,
      })
      setInforDebugMes('Changing Ref')
    } else if (state === indMetaType) {
      setMetaInputs({
        profile: metaDataInputs.profile,
        employment_history: metaDataInputs.employment_history,
        education: metaDataInputs.education,
        references: metaDataInputs.references,
        type: value,
      })
      setInforDebugMes('Changing Type')
    }
    inputParams[metaInd] = {
      type: 'Bytes',
      value: JSON.stringify(metaDataInputs),
    }

    // setFormState({palletRpc:'cv', callable:'createItem',inputParams: inputParams})
    setFormState(formState => {
      return { ...formState, inputParams }
    })
  }

  const onInterxTypeChange = (ev, data) => {
    setInterxType(data.value)
    // clear the formState
    setFormState({ palletRpc: '' })
  }

  const getOptionalMsg = interxType =>
    interxType === 'RPC'
      ? 'Optional Parameter'
      : 'Leaving this field as blank will submit a NONE value'
  const metaInd = 1
  const createdInd = 2
  const orgDateInd = 3
  const expDataInd = 4
  const keywordsInd = 5
  const certificateIdInd = 6
  const labelNames = [
    {
      value: 'Owner ID',
    },
    {
      value: 'Metadata',
    },
    // {
    //   value: 'Issued date',
    // },
    {
      value: 'Time original date',
    },
    {
      value: 'Time expired date',
    },
    {
      value: 'Keywords',
    },
    {
      value: 'Certificate ID',
    },
  ]
  return (
    <div className="updateCVContainerDB">
      <HeaderDashboard />
      <div className="cardCV">
        {/* <div className="cardCVInfo">
          <div className="cardCVInfoItem">
            <Image src={imgCV} className="imgCV"></Image>
            <div className="buttonEditCV">Edit CV</div>
            <div className="dateCreateCV">
              <p className="created">Created</p>
              <p className="dateCreate">8/20/2019</p>
            </div>
          </div>
          <div className="cardCVInfoItem">
            <Image src={imgCV} className="imgCV"></Image>
            <div className="buttonEditCV">Edit CV</div>
            <div className="dateCreateCV">
              <p className="created">Created</p>
              <p className="dateCreate">8/20/2019</p>
            </div>
          </div>
        </div>
        <Link to="/create-cv">
          <div className="buttonCreateNewCV">
            <Icon name="plus" className="iconAddNewCV" size="massive"></Icon>
          </div>
        </Link> */}
        <div className="createCVContainerDB">
          <Container>
            <div className="createCVTitle">Create CV</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Form className="formInputCreateCV">
                {/* <Form.Field className="formFieldCreateCV">
                  <label>CVID</label>
                  <input type="text" 
                  className="inputCV" 
                  placeholder='Bytes'
                  name="cvid" 
                  // value={JSON.stringify(paramFields)}
                  />
                </Form.Field> */}
                <Form.Field className="formFieldCreateCV">
                  <label> Submitter ID</label>
                  {/* <input type="text" className="inputCV" name="submitterid" /> */}
                  <AccountMain className="inputCV" />
                </Form.Field>

                {paramFields.map((paramField, ind) => {
                  if (
                    paramField.name === 'createdDate' ||
                    paramField.name === 'periodFrom' ||
                    paramField.name === 'periodTo'
                  ) {
                    return (
                      <Form.Field
                        key={`${paramField.name}-${paramField.type}`}
                        className="formFieldCreateCV"
                      >
                        {paramField.optional ? (
                          <label>
                            {
                              // labelNames[ind].value +" (*)" + "-" + paramField.name
                              labelNames[ind].value
                              // paramField.name
                            }
                          </label>
                        ) : (
                          <label>
                            {
                              labelNames[ind].value
                              // labelNames[ind].value + "-" + paramField.name
                              //
                            }
                          </label>
                        )}
                        <SemanticDatepicker
                          // label={labelNames[ind].value}
                          fluid
                          state={{ ind, paramField }}
                          onChange={handleDateChange}
                          className="inputCV"
                        />
                      </Form.Field>
                    )
                  } else if (paramField.name !== 'metadata') {
                    return (
                      <Form.Field
                        key={`${paramField.name}-${paramField.type}`}
                        className="formFieldCreateCV"
                      >
                        {paramField.optional ? (
                          <label>
                            {
                              labelNames[ind].value
                              // labelNames[ind].value + " (*)" + "-" + paramField.name
                            }
                          </label>
                        ) : (
                          <label>
                            {
                              labelNames[ind].value
                              // labelNames[ind].value + "-" + paramField.name
                            }
                          </label>
                        )}
                        <Input
                          placeholder={paramField.type}
                          fluid
                          type="text"
                          className="inputCV"
                          // // label={labelNames[ind].value}
                          // label={labelNames[ind].value}
                          state={{ ind, paramField }}
                          value={inputParams[ind] ? inputParams[ind].value : ''}
                          onChange={onPalletCallableParamChange}
                        />
                        {/* {paramField.optional ? (
                                    <Label
                                      basic
                                      pointing = "left"
                                      color="teal"
                                      content={getOptionalMsg(interxType)}
                                    />
                                  ) : null} */}
                      </Form.Field>
                    )
                  }

                  return (
                    <div>
                      <Form.Field className="formFieldCreateCV">
                        <label>Profile</label>
                        <Input
                          className="inputCV"
                          placeholder="Bytes"
                          fluid
                          type="text"
                          // label={labelNames[ind].value}
                          // label='Profile'
                          state={indMetaProf}
                          value={
                            metaDataInputs.profile ? metaDataInputs.profile : ''
                          }
                          onChange={onMetaDataChange}
                        />
                      </Form.Field>
                      <Form.Field className="formFieldCreateCV">
                        <label>Employment History</label>
                        <Input
                          className="inputCV"
                          placeholder="Bytes"
                          fluid
                          type="text"
                          // label={labelNames[ind].value}
                          // label='Employment History'
                          state={indMetaEmpl}
                          value={
                            metaDataInputs.employment_history
                              ? metaDataInputs.employment_history
                              : ''
                          }
                          onChange={onMetaDataChange}
                        />
                      </Form.Field>
                      <Form.Field className="formFieldCreateCV">
                        <label>Education</label>
                        <Input
                          className="inputCV"
                          placeholder="Bytes"
                          fluid
                          type="text"
                          // label={labelNames[ind].value}
                          // label='Education'
                          state={indMetaEdu}
                          value={
                            metaDataInputs.education
                              ? metaDataInputs.education
                              : ''
                          }
                          onChange={onMetaDataChange}
                        />
                      </Form.Field>
                      <Form.Field
                        style={{ marginBottom: '15px' }}
                        className="formFieldCreateCV"
                      >
                        <label>References</label>
                        <Input
                          className="inputCV"
                          placeholder="Bytes"
                          fluid
                          type="text"
                          // label={labelNames[ind].value}
                          // label='References'
                          state={indMetaRef}
                          value={
                            metaDataInputs.references
                              ? metaDataInputs.references
                              : ''
                          }
                          onChange={onMetaDataChange}
                        />
                      </Form.Field>
                      <Form.Field
                        style={{ marginBottom: '15px' }}
                        className="formFieldCreateCV"
                      >
                        <label>Type</label>
                        <Input
                          className="inputCV"
                          placeholder="Bytes"
                          fluid
                          type="text"
                          // label={labelNames[ind].value}
                          // label='Type'
                          state={indMetaType}
                          value={metaDataInputs.type ? metaDataInputs.type : ''}
                          onChange={onMetaDataChange}
                        />
                      </Form.Field>
                    </div>
                  )
                })}
                <Form.Field className="formFieldCreateCV contentForm">
                  <label>Content</label>
                  <TextArea
                    type="text"
                    placeholder="Content"
                    className="textContent"
                    // value={JSON.stringify(inputParams)}
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
              {/* <Button type="submit" className="buttonPostCV">
                Post
              </Button> */}
              <InteractorSubmit
                setStatus={setStatus}
                attrs={{
                  interxType,
                  palletRpc,
                  callable,
                  inputParams,
                  paramFields,
                }}
              />
            </div>
            <div
              style={{ overflowWrap: 'break-word' }}
              className="formInputCreateCV formFieldCreateCV statusMes inputCV"
            >
              {status}
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}
function InteractorSubmit(props) {
  const {
    attrs: { interxType },
  } = props
  if (interxType === 'QUERY') {
    return <TxButton label="Query" type="QUERY" color="blue" {...props} />
  } else if (interxType === 'EXTRINSIC') {
    return <TxGroupButton {...props} />
  } else if (interxType === 'RPC' || interxType === 'CONSTANT') {
    return <TxButton label="Submit" type={interxType} color="blue" {...props} />
  }
}
