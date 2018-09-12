import React from 'react';
import PropTypes from 'prop-types';
import {getUnhandledProps, getFormatedDate} from '../utils'
import {Calendar as Cal} from "calendar";
import {
  Table, Icon
} from 'semantic-ui-react';
import {WEEKDAYS, SHORT_MONTHS, MONTHS} from '../utils'

const WeekDayHeader = () => {
  return WEEKDAYS.map(day => (
    <Table.HeaderCell
      style={{border: 'none', borderBottom: '1px solid rgba(34,36,38,.1)'}}
      key={day}
      colSpan='1'>
      {day}
    </Table.HeaderCell>
  ))
}

const PickerHeader = (props) => {
  const {header, onNext, onPrevious} = props;
  const width = props.width||7;
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell onClick={onPrevious} style={{border: 'none', cursor: 'pointer'}} colSpan='1'>
          <Icon
          fitted
          name='chevron left'/>
        </Table.HeaderCell>
        <Table.HeaderCell style={{border: 'none'}} colSpan={(parseInt(width)-2).toString()}>
          {header}
        </Table.HeaderCell>
        <Table.HeaderCell onClick={onNext} style={{border: 'none', cursor: 'pointer'}} colSpan='1'>
          <Icon
          fitted
          name='chevron right'/>
        </Table.HeaderCell>
      </Table.Row>
      <Table.Row>
        <WeekDayHeader />
      </Table.Row>
    </Table.Header>
  )
}

export {PickerHeader};
export default PickerHeader;
