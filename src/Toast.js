
import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

import 'semantic-ui-css/components/message.min.css';
import 'semantic-ui-css/components/header.min.css';

import withTransition from './Transition';

const icons = {
    info: 'info circle',
    success: 'checkmark',
    error: 'exclamation circle',
    warning: 'warning sign'
};

function Toast(props) {
    const { type, title, description, onClose } = props;
    const icon = props.icon || icons[type];

    return (
        <Message
            onDismiss={onClose}
            info={type === 'info'}
            success={type === 'success'}
            error={type === 'error'}
            warning={type === 'warning'}
            header={title}
            content={description}
            icon={icon}
            floating
        />
    );
}

Toast.propTypes = {
    type: PropTypes.oneOf(['info', 'success', 'error', 'warning']).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onClose: PropTypes.func
};

Toast.defaultProps = {
    onClose: undefined
};

export default withTransition(Toast);
