
import React from 'react';

import 'react-tabs/style/react-tabs.css';

import _ from 'web-ext-plugins/localized'
import Tabbed from 'web-ext-plugins/widgets/tabs'

import NotificationCategory from './category';


// import NotificationType from './type'


export default class TabbedNotifications extends Tabbed {

    get mapping () {
        const _mapping = []
        let i = 0;
        for (let [type, data] of Object.entries(this.props.notifications)) {
            _mapping.push({title: this.renderTitle(type, data, i), content: this.renderContent(type, data, i)})
            i++;
        }
        return _mapping;
    }

    renderTitle (type) {
        return <_ text={type} />
    }

    renderContent (type, data, key) {
        return (
            <NotificationCategory
               updateNotifications={this.props.updateNotifications}
               manager={this.props.manager}
               key={key}
               notifications={data.notifications}
               plugin={data.plugin}
               category={type}
               />);
    }
}
