import React, {Component} from 'react';
import {DatePicker} from './DatePicker';
import {Input, Popup} from 'semantic-ui-react'

class DateInput extends Component {
  constructor () {
    super()
    this.state = {
      input: '',
    }
  }
  handleDateChange=(e, data)=>{
    const {value} = data;
    const {model} = this.props;
    e.preventDefault()
    this.setState({
      input: value,
    })
    model.setData(value)
  }

  render() {
    // const {activeDate} = this.state;
    const {model} = this.props;
    let value = model.getData()
    const trigger = (
      <Input
      icon='calendar'
      {...this.props}
      className='Field'
      iconPosition='left'
      value={value} />
    )
    return (
      <Popup
        flowing
        trigger={trigger}
        position='top center'
        on='click'
        style={{padding: '0'}}
        hoverable>
          <DatePicker
          onCellClick={this.handleDateChange} />
      </Popup>
    )
  }
}

export {DateInput};
export default DateInput;
