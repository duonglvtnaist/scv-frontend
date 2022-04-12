// Copyright 2017-2022 @polkadot/app-storage authors & contributors
// SPDX-License-Identifier: Apache-2.0


import React, { useState } from 'react';
import { Form, Input, Label, List } from 'semantic-ui-react';
import "./searchCV.css"

export default function Query ( value ) {
    // const metaIsJsonCheck = IsJsonString(hex_to_ascii(JSON.parse(value.value).metadata).substr(1,hex_to_ascii(JSON.parse(value.value).metadata).length-1))
   if (!IsJsonString(value.value) || value.value ==null) {
    return <div>
            <Form.Field className='formFieldCreateCV'>
                <label>{"Information: "}</label>
                <Input
                    className='inputCV'
                    fluid
                    value={"Please fill the search data!!!"}
                />
            </Form.Field>
            {/* <Form.Field className='formFieldCreateCV'>
                <label>{"Information: "}</label>
                <Input
                    className='inputCV'
                    fluid
                    value='No information to show'
                ></Input>
            </Form.Field> */}
    </div> 

    // {JSON.stringify(value.value) }
  } else if (JSON.parse(value.value).itemId==null) {
    return   <Input
                className='inputCV'
                fluid
                label={{ basic: true, content: 'CV IDs list' }}
                labelPosition="left"
                value={"value.value"}
            ></Input>
            
  } else{
    return <div>
        <div className="createCVTitle">Search result </div>
        <Form.Field className="formFieldCreateCV">
                <label> CV ID</label>
                <Input
                    className='inputCV'
                    fluid
                    // label={{ basic: true, content: 'CV ID' }}
                    labelPosition="left"
                    value={JSON.parse(value.value).itemId}
                ></Input>
        </Form.Field>
        <Form.Field className="formFieldCreateCV">
                <label> Owner</label>
                <Input
                    className='inputCV'
                    fluid
                    // label={{ basic: true, content: 'CV ID' }}
                    labelPosition="left"
                    value={JSON.parse(value.value).owner}
                ></Input>
        </Form.Field>

        {/* <Form.Field className="formFieldCreateCV">
                <label> Created: </label>
        </Form.Field> */}
        <Form.Field className="formFieldCreateCV">
            <label> Submitter </label>
            <Input
                fluid
                className='inputCV'
                // label={{ basic: true, content: 'Submitter' }}
                labelPosition="left"
                value={JSON.parse(value.value).created.account}
            ></Input>
        </Form.Field>
        <Form.Field className="formFieldCreateCV">
            <label> Block </label>
            <Input
                fluid
                className='inputCV'
                // label={{ basic: true, content: 'Block' }}
                labelPosition="left"
                value={JSON.parse(value.value).created.block}
            ></Input>
        </Form.Field>
           
        <Form.Field className="formFieldCreateCV">
            <label> Time </label>
            <Input
                fluid
                className='inputCV'
                // label={{ basic: true, content: 'Time' }}
                labelPosition="left"
                // value={JSON.parse(value.value).created.time}
                // value={new Date(JSON.parse(value.value).created.time).toLocaleDateString("ja-JP")}
                value={new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(JSON.parse(value.value).created.time)}
            ></Input>
        </Form.Field>
        <Form.Field className="formFieldCreateCV" >
            <label> Time original date </label>
            <Input
                className='inputCV'
                fluid
                // label={{ basic: true, content: 'Time original date' }}
                labelPosition="left"
                value={new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(JSON.parse(value.value).periodFrom)}
            ></Input>
        </Form.Field>
        <Form.Field className="formFieldCreateCV" >
            <label> Time expired date </label>
            <Input
                className='inputCV'
                fluid
                // label={{ basic: true, content: 'Time original date' }}
                labelPosition="left"
                value={new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(JSON.parse(value.value).periodTo)}
            ></Input>
        </Form.Field>
        <Form.Field className="formFieldCreateCV">
                <label> Certificate ID</label>
                <Input
                    className='inputCV'
                    fluid
                    // label={{ basic: true, content: 'CV ID' }}
                    labelPosition="left"
                    value={JSON.parse(value.value).certificateID}
                ></Input>
        </Form.Field>
        {
            
            (JSON.parse(value.value).keywords).map((keywords, ind) => {
                return  <Form.Field className="formFieldCreateCV">
                        <label> {"Keyword["+ind+"]"}</label>
                    <Input
                        className='inputCV'
                        fluid
                        // label={{ basic: true, content: 'CV ID' }}
                        labelPosition="left"
                        value={hex_to_ascii(JSON.parse(value.value).keywords[ind]) }
                    ></Input>
                </Form.Field>

            })
        }


        <CheckMetaProfile 
            metaIsJson={IsJsonString(hex_to_ascii(JSON.parse(value.value).metadata).substr(1,hex_to_ascii(JSON.parse(value.value).metadata).length-1))}
        />
        <CheckMetaEmploy metaIsJson={IsJsonString(hex_to_ascii(JSON.parse(value.value).metadata).substr(1,hex_to_ascii(JSON.parse(value.value).metadata).length-1))} />
        <CheckMetaEdu metaIsJson={IsJsonString(hex_to_ascii(JSON.parse(value.value).metadata).substr(1,hex_to_ascii(JSON.parse(value.value).metadata).length-1))} />
        <CheckMetaRef metaIsJson={IsJsonString(hex_to_ascii(JSON.parse(value.value).metadata).substr(1,hex_to_ascii(JSON.parse(value.value).metadata).length-1))} />
    </div>
  }
  
function CheckMetaProfile(props) {
    const metaIsJson = props.metaIsJson;
    if (metaIsJson === true) {
        return <Form.Field className="formFieldCreateCV">
            <label> Profile </label>
            <Input
                className='inputCV'
                fluid
                // label={{ basic: true, content: 'CV ID' }}
                labelPosition="left"
                value={JSON.parse(hex_to_ascii(JSON.parse(value.value).metadata).substr(1,hex_to_ascii(JSON.parse(value.value).metadata).length-1)).profile}
            ></Input>
        </Form.Field>
    }
    return <Form.Field className="formFieldCreateCV">
                <label> Message Meta </label>
                <Input
                    className='inputCV'
                    fluid
                    // label={{ basic: true, content: 'CV ID' }}
                    labelPosition="left"
                    value={hex_to_ascii(JSON.parse(value.value).metadata)}
                    // value={metaIsJson}
                ></Input>
            </Form.Field>
  } 
  function CheckMetaRef(props) {
    const metaIsJson = props.metaIsJson;
    if (metaIsJson === true) {
        return <Form.Field className="formFieldCreateCV">
            <label> Profile </label>
            <Input
                className='inputCV'
                fluid
                // label={{ basic: true, content: 'CV ID' }}
                labelPosition="left"
                value={JSON.parse(hex_to_ascii(JSON.parse(value.value).metadata).substr(1,hex_to_ascii(JSON.parse(value.value).metadata).length-1)).references}
            ></Input>
        </Form.Field>
    }
    return null
  } 
  function CheckMetaEmploy(props) {
    const metaIsJson = props.metaIsJson;
    if (metaIsJson === true) {
        return <Form.Field className="formFieldCreateCV">
            <label> Employment History </label>
            <Input
                className='inputCV'
                fluid
                // label={{ basic: true, content: 'CV ID' }}
                labelPosition="left"
                value={JSON.parse(hex_to_ascii(JSON.parse(value.value).metadata).substr(1,hex_to_ascii(JSON.parse(value.value).metadata).length-1)).employment_history}
            ></Input>
        </Form.Field>
    }
    return null
  } 
  function CheckMetaEdu(props) {
    const metaIsJson = props.metaIsJson;
    if (metaIsJson === true) {
        return <Form.Field className="formFieldCreateCV">
            <label> Education </label>
            <Input
                className='inputCV'
                fluid
                // label={{ basic: true, content: 'CV ID' }}
                labelPosition="left"
                value={JSON.parse(hex_to_ascii(JSON.parse(value.value).metadata).substr(1,hex_to_ascii(JSON.parse(value.value).metadata).length-1)).education}
            ></Input>
        </Form.Field>
    }
    return null
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

  function hex_to_ascii(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }