/* eslint-disable no-useless-computed-key */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'semantic-ui-css/components/reset.min.css';
import 'semantic-ui-css/components/site.min.css';
import 'semantic-ui-css/components/container.min.css';
import 'semantic-ui-css/components/icon.min.css';

import './toast.css';

import Toast from './Toast';
import { store } from './toaster';

const animations = {
    ['top-right']: 'fly left',
    ['top-center']: 'fly down',
    ['top-left']: 'fly right',
    ['bottom-right']: 'fly left',
    ['bottom-center']: 'fly up',
    ['bottom-left']: 'fly right'
};

class ToastContainer extends Component {
    static propTypes = {
        position: PropTypes.oneOf([
            'top-right',
            'top-center',
            'bottom-right',
            'bottom-center',
            'bottom-left'
        ]),
        animation: PropTypes.string
    };

    static defaultProps = {
        position: 'top-right',
        animation: null
    };

    state = {
        toasts: []
    };

    componentDidMount() {
        store.subscribe(this.updateToasts);
    }

    componentWillUnmount() {
        store.unsubscribe(this.updateToasts);
    }

    onClose = toastId => {
        const toast = this.state.toasts.find(value => value.id === toastId);

        if (!toast) return;
        store.remove(toast);

        if (toast.onClose) toast.onClose();
    };

    updateToasts = () => {
        this.setState({
            toasts: store.data
        });
    };

    render() {
        const { position } = this.props;
        const animation = this.props.animation || animations[position];

        return (
            <div className={`ui-alerts ${position}`}>
                {this.state.toasts.map((toast) => {
                    const {
                        id,
                        type = 'info',
                        title = '',
                        description = '',
                        icon,
                        time
                    } = toast;
                    return (
                        <Toast
                            key={id}
                            toastId={id}
                            type={type}
                            title={title}
                            description={description}
                            icon={icon}
                            animation={animation}
                            time={time}
                            onClose={this.onClose}
                        />
                    );
                })}
            </div>
        );
    }
}

export default ToastContainer;
