import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  getUnhandledProps,
  getFormatedDate,
  parseFormatedTime,
  HOURS,
  MINIUTES
} from '../utils';
import {
  Table, Header
} from 'semantic-ui-react';
import {PickerCell as Cell} from './PickerCell'
import {PickerHeader} from './PickerHeader'

const MODE = ['HOUR_PICKER', 'MINUTE_PICKER']

class TimePicker extends Component {
  constructor (props) {
    super(props);
    const {format} = props;
    this.dele = format.replace(/(hh|mt)/g, '');
    this.state={hour:'', minute:'', nextMode:'HOUR_PICKER'}
  }
  hourChange = (data) => {
    let hr = data.split(this.dele)[0];
    this.setState({hour: hr, nextMode: 'MINUTE_PICKER'})
  }
  minuteChange = (data) => {
    let min = data.split(this.dele)[1];
    this.setState({minute: min, nextMode: ''})
  }
  hourGrid = () => {
    const {hour, nextMode} = this.state;
    const {onCellClick} = this.props;
    const hours = HOURS.map((hr)=>(
      <Cell
      key={hr}
      width='4'
      data={`${hr}${this.dele}00`}
      active={hr === hour}
      mode={nextMode}
      onChange={this.hourChange}
      onClick={onCellClick} />
    ));
    const rows = function() {
      const rows = [];
      let rowIndex = 0;
      for (let i = 0; i < hours.length; i++) {
        if (i % 4 === 0 && i !== 0) { rowIndex += 1; }
        if (!rows[rowIndex]) { rows[rowIndex] = []; }
        rows[rowIndex].push(hours[i]);
      }
      return rows;
  }().map((row, i) => <Table.Row key={i}>{ row }</Table.Row>);
    return rows;
  }
  minuteGrid = () => {
    const {hour, minute, nextMode} = this.state;
    const {onCellClick} = this.props;
    const minutes = MINIUTES.map((mt)=>(
      <Cell
      key={mt}
      width='4'
      data={`${hour}${this.dele}${mt}`}
      mode={nextMode}
      active={minute === mt}
      onChange={this.minuteChange}
      onClick={onCellClick} />
    ));
    const rows = function() {
      const rows = [];
      let rowIndex = 0;
      for (let i = 0; i < minutes.length; i++) {
        if (i % 3 === 0 && i !== 0) { rowIndex += 1; }
        if (!rows[rowIndex]) { rows[rowIndex] = []; }
        rows[rowIndex].push(minutes[i]);
      }
      return rows;
  }().map((row, i) => <Table.Row key={i}>{ row }</Table.Row>);
    return rows;
  }
  render () {
    const {nextMode} = this.state;
    return (
      <Table unstackable
      celled
      textAlign="center">
      <Table.Body>
      {(nextMode==='HOUR_PICKER') && this.hourGrid()}
      {(nextMode==='MINUTE_PICKER') && this.minuteGrid()}
      </Table.Body>
      </Table>
    )
  }
}

TimePicker.propTypes = {
  format: PropTypes.string,
  onCellClick: PropTypes.func,
}

TimePicker.defaultProps = {
  format: 'hh:mt'
}

export {TimePicker};
export default TimePicker;
