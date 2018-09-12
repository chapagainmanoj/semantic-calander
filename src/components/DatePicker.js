import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  MONTHS,
  getUnhandledProps,
  getFormatedDate,
  isDateInMonth,
  isDatesEqual
  } from '../utils'
import {Calendar as Cal} from "calendar";
import {
  Table, Button,
} from 'semantic-ui-react';
import {PickerCell as Cell} from './PickerCell'
import {PickerHeader} from './PickerHeader'

const getMonthDates = (yr, mt) => {
  return new Cal().monthDates(yr, mt)
}

class DatePicker extends Component {
  constructor (props) {
    super(props);
    let date = new Date();
    const {initalDate} = props;
    let year = date.getFullYear();
    let month = date.getMonth();
    this.state={
      year, month, activeDate: initalDate, today: date, mode: 'DATE_PICKER'
    }
  }
  changeActive = (date) => {
    this.setState({activeDate: date, mode: ''})
  }
  monthDateGrid = (dateGrid) => {
    const {onCellClick, format, disablePast} = this.props;
    const {activeDate, month, today, mode} = this.state;
    return dateGrid.map((week)=>{
      const days = week.map((day)=>{
        const disabled = !isDateInMonth(day, month) || (disablePast && isPast(day))
        return (
          <Cell
            key={getFormatedDate(day, 'dd-D-M-yyyy')}
            warning={isDatesEqual(today, day)}
            active={activeDate && isDatesEqual(activeDate, day)}
            disabled={disabled}
            format={format}
            mode={mode}
            onClick={onCellClick}
            onChange={this.changeActive}
            data={day}
          />
        )
      })
      return (
        <Table.Row key={getFormatedDate(week[0], 'dd-D-M-yyyy')}>
        {days}
        </Table.Row>
      )
    })
  }
  prevMonth = (e) => {
    e.stopPropagation();
    this.setState((prevState)=>{
      let prev = prevState.month - 1;
      if (prev === -1) {
        return {month: 11, year: prevState.year-1}
      } else {
        return {month: prev}
      }
    })
  }
  nextMonth = (e) => {
    e.stopPropagation();
    this.setState((prevState)=>{
      let next = prevState.month + 1;
      if (next === 12) {
        return {month: 0, year: prevState.year+1}
      } else {
        return {month: next}
      }
    })
  }
  render () {
    const {year, month} = this.state;
    const dateGrid = getMonthDates(year, month);
    return (
      <Table unstackable
      celled
      textAlign="center">
      <PickerHeader
        header={`${MONTHS[month]} ${year}`}
        onNext={this.nextMonth}
        onPrevious={this.prevMonth}
        />
      <Table.Body>
      {this.monthDateGrid(dateGrid)}
      </Table.Body>
      </Table>
    )
  }
}

DatePicker.propTypes = {
  format: PropTypes.string,
  onCellClick: PropTypes.func,
}

DatePicker.defaultProps = {
  format: 'yyyy-mm-dd'
}

export {DatePicker};
export default DatePicker;
