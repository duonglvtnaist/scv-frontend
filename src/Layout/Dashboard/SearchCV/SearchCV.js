// import React from 'react'
import './searchCV.css'
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
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { TxButton, TxGroupButton } from '../../../substrate-lib/components'
import Query from './Query'



const argIsOptional = arg => arg.type.toString().startsWith('Option<')

export default function SearchCV() {
  const { api, jsonrpc } = useSubstrateState()
  const [status, setStatus] = useState(null)

  const [interxType, setInterxType] = useState('QUERY')
  const [submitType, setSubmitType] = useState('EXTRINSIC')
  const [palletRPCs, setPalletRPCs] = useState([])
  const [callables, setCallables] = useState([])
  const [paramFields, setParamFields] = useState([])

  const [submitPalletRPC, setsubmitPalletRPC] = useState('cv')
  const [submitCallable, setsubmitCallable] = useState('revokeItem')
  const [inforDebugMes, setInforDebugMes] = useState('Initital value')
  
  const [submitInputParam, setsubmitInputParam] = useState([{"type":"u32","value":"noID"}])
  const [submitParamField, setsubmitParamField] = useState([{"name":"itemId","type":"u32","optional":false}])

  
  const initFormState = {
    palletRpc: 'cv',
    callable: 'itemById',
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
    profile:'Profile',
    employment_history:'Employment History',
    education:'Education',
    references:'References',
    type: 'Type'
  }
  const initMetaDataInputs = {
    profile:'',
    employment_history:'',
    education:'',
    references:'',
    type:'',
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
        setsubmitInputParam([{type:"u32", value}])
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
      inputParams[ind] = { type, value: date.toString()}  
      res = { ...formState, inputParams }
      setInforDebugMes(inputParams[ind].value)
      return res
    })
  
  }
  const onMetaDataChange = (_,data) => {
    const {state, value} = data
    const inputParams = [...formState.inputParams]
    setInforDebugMes("Changing Meta")
    if(state===indMetaProf){
      setMetaInputs({profile: value, employment_history: metaDataInputs.employment_history, education: metaDataInputs.education, references: metaDataInputs.references, type: metaDataInputs.type })
      setInforDebugMes("Changing Prof")
    } else if(state===indMetaEmpl){
      setMetaInputs({profile: metaDataInputs.profile, employment_history: value, education: metaDataInputs.education, references: metaDataInputs.references, type: metaDataInputs.type })
      setInforDebugMes("Changing Emp")
    } else if(state===indMetaEdu){
      setMetaInputs({profile: metaDataInputs.profile, employment_history: metaDataInputs.employment_history, education: value, references: metaDataInputs.references, type: metaDataInputs.type })
      setInforDebugMes("Changing Edu")
    } else if(state===indMetaRef){
      setMetaInputs({profile: metaDataInputs.profile, employment_history: metaDataInputs.employment_history, education: metaDataInputs.education, references: value, type: metaDataInputs.type })
      setInforDebugMes("Changing Ref")
    } else if(state===indMetaType){
      setMetaInputs({profile: metaDataInputs.profile, employment_history: metaDataInputs.employment_history, education: metaDataInputs.education, references: metaDataInputs.references, type: value })
      setInforDebugMes("Changing Type")
    }
    inputParams[metaInd]= {type:'Bytes', value:(JSON.stringify(metaDataInputs))}
    
    // setFormState({palletRpc:'cv', callable:'createItem',inputParams: inputParams})
    setFormState(formState => {
      return {...formState, inputParams}
    })
  }
  
    const onInterxTypeChange = (ev, data) => {
      setInterxType(data.value)
      // clear the formState
      setFormState({palletRpc:''})
    }

    const getOptionalMsg = interxType =>
      interxType === 'RPC'
        ? 'Optional Parameter'
        : 'Leaving this field as blank will submit a NONE value'
    const cvIDInd = 0
    const ownerInd = 1
    const metaInd = 2
    const createdInd = 3
    const orgDateInd = 4
    const expDataInd = 5
    const keywordsInd = 6
    const certificateIdInd = 7
    const labelNames = [
      {
        value: 'CV ID',
      },
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
    <div className="updateCVContainer">
      <HeaderDashboard />
      <div className="cardCV">
        <div className="createCVContainer">
          <Container>
            <div className="createCVTitle">Search CV</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Form className="formInputCreateCV">

                <Form.Field className="formFieldCreateCV">
                  <label> Submitter ID</label>
                  <AccountMain className="inputCV" />
                </Form.Field>
               

                {paramFields.map((paramField, ind) => {
                        return <Form.Field key={`${paramField.name}-${paramField.type}` } className="formFieldCreateCV">
                                  
                        { paramField.optional?(
                          <label>{
                            // labelNames[ind].value
                            "CV ID"
                            // labelNames[ind].value + " (*)" + "-" + paramField.name
                          }</label>
                        ):
                          <label>{
                            // labelNames[ind].value
                            "CV ID"
                            // labelNames[ind].value + "-" + paramField.name
                          }</label>
                        }
                        <Input
                          placeholder={"Bytes"}
                          fluid
                          type="text"
                          className="inputCV"
                          // // label={labelNames[ind].value}
                          // label={labelNames[ind].value}
                          state={{ ind, paramField }}
                          value={inputParams[ind] ? inputParams[ind].value : ''}
                          onChange={onPalletCallableParamChange}
                        />
                   
                      </Form.Field>
                              
                      }
                      )}
             
           
                <Query value={status} style={{marginBottom:"100px"}}/>
              </Form>
              
            </div>
            <div className="buttonSavePostCV">
              <Link to="/home-page">
                <Icon name="arrow left" size="big"></Icon>
              </Link>
              <Button type="submit" className="buttonSaveCV">
                Save
              </Button>
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
                 {/* <InteractorSubmit
                  setStatus={setStatus}
                  attrs={{
                    interxType:submitType,
                    palletRpc:submitPalletRPC,
                    callable:submitCallable,
                    inputParams:submitInputParam,
                    paramFields:submitParamField,
                  }}
                /> */}
                

            </div>
           
            {/* <div style={{ overflowWrap: 'break-word', marginTop:"50px", width:"100px" }} className="formInputCreateCV formFieldCreateCV statusMes inputCV">{status}</div> */}
          </Container>
    </div>
  )
      </div>
    </div>
  )
}
function InteractorSubmit(props) {
  const {
    attrs: { interxType },
  } = props
  if (interxType === 'QUERY') {
    return <TxButton label="Search" type="QUERY" color="blue" {...props} />
  } else if (interxType === 'EXTRINSIC') {
    return <TxButton label="Revoke" type="EXTRINSIC" color="red" {...props} />
  } else if (interxType === 'RPC' || interxType === 'CONSTANT') {
    return <TxButton label="Submit" type={interxType} color="blue" {...props} />
  }
}
function IsJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}