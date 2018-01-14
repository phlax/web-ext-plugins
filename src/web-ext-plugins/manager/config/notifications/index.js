import React from 'react';

import TabbedNotifications from './tabbed';


export default class ConfigureNotifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {notifications: []}
        this.updateNotification = this.updateNotification.bind(this)
        this.updateComponent = this.updateComponent.bind(this)
    }

    updateComponent () {
        return this.props.manager.notifications.get().then(result => {
            this.setState({notifications: result});
        });
    }

    componentDidMount() {
        this.updateComponent()
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

    updateNotification (evt) {
        return this.props.manager.notifications.update(
            evt.target.name,
            evt.target.dataset.plugin,
            evt.target.dataset.category,
            evt.target.checked).then(this.updateComponent)
    }

    render() {
        return (
            <div>
              <TabbedNotifications
                 notifications={this.notificationsByCategory}
                 updateNotification={this.updateNotification}
                 manager={this.props.manager} />
            </div>
        );
    }
}
