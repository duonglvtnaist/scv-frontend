import React from 'react';
import { Message } from 'semantic-ui-react';
export default class DisplayMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultMessage: {
        status: 200,
        visible: false,
        message: '',
        isError: false,
        defaultMessage: 'Something went wrong. Please try again later.'
      }
    };
  }

  componentDidMount() {
    this.setState({
      resultMessage:{
      status: this.props.data.status,
      visible: this.props.data.visible,
      message: this.props.data.message,
      isError: this.props.data.isError
      }
    })
  }

  render () {
    
    return (
      <div>
        <Message visible={this.state.resultMessage.visible} success={!this.state.resultMessage.isError} error={this.state.resultMessage.isError}>
          <p>{this.state.resultMessage.message || this.state.resultMessage.defaultMessage}</p>
        </Message>
      </div>
    )
  }
}