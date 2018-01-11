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
                           updateNotifications={this.props.updateNotifications}
                           manager={this.props.manager}
                           key={key}
                           notification={notification}
                           data={data}
                           />);
                })}
            </ul>
          </div>);
    }
}
