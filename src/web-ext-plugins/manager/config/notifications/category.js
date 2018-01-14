import React from 'react';

import Notification from './notification';
import Subheading from 'web-ext-plugins/widgets/sub-heading';


export default class NotificationList extends React.Component {

    render() {
        return (
            <div>
              <Subheading text={this.props.category} l10n={this.props.plugin} />
              <ul>
                {Object.entries(this.props.notifications).map(([notification, data], key) => {
                    return (
                        <Notification
                           updateNotification={this.props.updateNotification}
                           manager={this.props.manager}
                           key={key}
                           name={notification}
                           notification={data}
                           category={this.props.category}
                           />);
                })}
            </ul>
          </div>);
    }
}
