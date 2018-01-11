import React from 'react';

import TabbedNotifications from './tabbed';


export default class ConfigureNotifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {notifications: []}
    }

    componentDidMount() {
        const $this = this;
        this.props.manager.notifications.get().then(result => {
            $this.setState({notifications: result});
        });
    }

    get notificationsByCategory () {
        const {notifications} = this.state;
        const _notifications = {}
        for (let notification of Object.entries(notifications)) {
            if (!(notification[1].category in _notifications)) {
                _notifications[notification[1].category] = {
                    plugin: notification[1].plugin,
                    notifications: {}}
            }
            _notifications[notification[1].category].notifications[notification[0]] = notification[1]
        }
        return _notifications
    }

    updateNotifications () {

    }

    render() {
        return (
            <div>
              <TabbedNotifications
                 notifications={this.notificationsByCategory}
                 updateNotifications={this.updateNotifications.bind(this)}
                 manager={this.props.manager} />
            </div>
        );
    }
}
