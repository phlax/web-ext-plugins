import React from 'react';

import _ from 'web-ext-plugins/localized';


export default class Notification extends React.Component {

    get value () {
        const {value} = this.props.notification;
        if ([true, false].indexOf(value) === -1) {
            return this.props.notification["default"];
        }
        return value;
    }

    render() {
        return (
            <div>
              <input
                 checked={this.value}
                 type="checkbox"
                 value={this.value}
                 onChange={this.props.updateNotification}
                 data-category={this.props.notification.category}
                 data-plugin={this.props.notification.plugin}
                 name={this.props.name}  />
              <_ text={this.props.notification.name}
                 l10n={this.props.notification.plugin} />
            </div>);
    }
}
