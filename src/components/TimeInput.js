import React, {Component} from 'react';
import {TimePicker} from './TimePicker';
import {Input, Popup} from 'semantic-ui-react'

class TimeInput extends Component {
  constructor () {
    super()
    this.state = {
      input: '',
      show: false
    }
  }
  handleDateChange=(e, data)=>{
    const {mode, value} = data;
    let isOpen = mode==='MINUTE_PICKER' ? false: true;
    this.setState({
      input: value,
      show: isOpen
    })
  }
  handleOpen=(e)=>{
    this.setState({show: true})
    setTimeout(()=>{this.setState({show: false})}, 8000)
  }
  handleClose=(e)=>{
    this.setState({show: false})
  }

  render() {
    const {show} = this.state;
    const trigger = (
      <Input
        icon='clock'
        iconPosition='left'
        value={this.state.input} />)
    return (
        <Popup
          flowing
          trigger={trigger}
          position='top center'
          style={{padding: '0'}}
          onOpen={this.handleOpen}
          open={show}
          on='focus'
          hideOnScroll
          hoverable
          >
          <TimePicker
              onCellClick={this.handleDateChange} />
          </Popup>
    )
  }
}

export {TimeInput};
export default TimeInput;
