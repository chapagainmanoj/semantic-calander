import React from 'react';
import PropTypes from 'prop-types';
import {getUnhandledProps, getFormatedDate, isDate} from '../utils'
import {
  Table, Button,
} from 'semantic-ui-react';
import './style.css'

class PickerCell extends React.Component {
  onCellClick = (e) => {
    e.stopPropagation();
    const {onClick, data, onChange, format} = this.props;
    onChange(data);
    const formatted = (isDate(data)) ? getFormatedDate(data, format): data;
    onClick(e, {...this.props, value: formatted});
  }
  render() {
    const rest = getUnhandledProps(PickerCell, this.props);
    let {data} = this.props;
    return (
      <Table.Cell
        { ...rest}
        className='focus-outline'
        onClick={this.onCellClick}>
        {isDate(data) ? data.getDate():data}
      </Table.Cell>
    )
  }
}
PickerCell.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.instanceOf(Date).isRequired,
    PropTypes.string
  ]),
  format: PropTypes.string,
  className: PropTypes.string,
  /** (event, data) => {} */
  onClick: PropTypes.func
};

export default PickerCell;
export {
  PickerCell
};
