import React, { createRef } from 'react'
import {
  Container,
  Dimmer,
  Loader,
  Grid,
  Sticky,
  Message,
  Dropdown,
  Form,
  Divider,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import { SubstrateContextProvider, useSubstrateState } from './substrate-lib'
import { DeveloperConsole } from './substrate-lib/components'

import AccountSelector from './AccountSelector'
import Balances from './Balances'
import BlockNumber from './BlockNumber'
import Events from './Events'
import Interactor from './Interactor'
import Metadata from './Metadata'
import NodeInfo from './NodeInfo'
import TemplateModule from './TemplateModule'
import Transfer from './Transfer'
import Upgrade from './Upgrade'
// import ReactDOM from 'react-dom'
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import HeaderMenu from "./HeaderMenu";
// import Footer from "./Footer";
// import styled from "styled-components";


// const Home = () => <h1>Home</h1>;
// const Places = () => <h1>Places</h1>;
// const Venues = () => <h1>Venues</h1>;
// const Floors = () => <h1>Floors</h1>;
// const MissingPage = () => <h1>URL doesn't exist</h1>;


function Main() {
  const { apiState, apiError, keyringState } = useSubstrateState()
  const options = [
    { key: 1, text: 'SYS-MAN', value: 1 },
    { key: 2, text: 'ORG', value: 2 },
    { key: 3, text: 'User', value: 3 },
  ]
  

  const loader = text => (
    <Dimmer active>
      <Loader size="small">{text}</Loader>
    </Dimmer>
  )

  const message = errObj => (
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message
          negative
          compact
          floating
          header="Error Connecting to Substrate"
          content={`Connection to websocket '${errObj.target.url}' failed.`}
        />
      </Grid.Column>
    </Grid>
  )

  if (apiState === 'ERROR') return message(apiError)
  else if (apiState !== 'READY') return loader('Connecting to Substrate')

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    )
  }

  const contextRef = createRef()
  // const onSelectorRolesChange = (_, data) => {
  //   setFormState(formState => {
  //     let res
  //     const { state, value } = data
  //     if (typeof state === 'object') {
  //       // Input parameter updated
  //       const {
  //         ind,
  //         paramField: { type },
  //       } = state
  //       const inputParams = [...formState.inputParams]
  //       inputParams[ind] = { type, value }
  //       res = { ...formState, inputParams }
  //     } else if (state === 'palletRpc') {
  //       res = { ...formState, [state]: value, callable: '', inputParams: [] }
  //     } else if (state === 'callable') {
  //       res = { ...formState, [state]: value, inputParams: [] }
  //     }
  //     return res
  //   })
  // }
  return (
    <div ref={contextRef}>
      <Sticky context={contextRef}>
        <AccountSelector />
      </Sticky>
      <Container>
        <Grid stackable columns="equal">
          <Grid.Row stretched>
            <NodeInfo />
            <Metadata />
            <BlockNumber />
            <BlockNumber finalized />
          </Grid.Row>
          <Grid.Row>
            <Interactor />
          </Grid.Row>
          <Grid.Row>
            <Transfer />
          </Grid.Row>
          <Grid.Row stretched>
            <Balances />
          </Grid.Row>
          <Grid.Row>
            <TemplateModule />
          </Grid.Row>
          <Grid.Row>
            <Events />
            <Upgrade />
          </Grid.Row>
          <Grid.Row>
            {/* <Dropdown 
              options={options}
              text="Role"
              attached
              placeholder="Pallets / RPC"
              fluid
              label="Selector_Roles"
              onChange={onSelectorRolesChange}
              search
              selection
              state="palletRpc"
              value={option}
              options={options}
            /> */}

          </Grid.Row>

        </Grid>

      </Container>
      <DeveloperConsole />
    </div>
  )
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  )
}
