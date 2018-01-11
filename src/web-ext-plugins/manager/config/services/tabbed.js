
import React from 'react';

import 'react-tabs/style/react-tabs.css';

import _ from 'web-ext-plugins/localized'
import Tabbed from 'web-ext-plugins/widgets/tabs'

import ServiceType from './type'


export default class TabbedServices extends Tabbed {

    get mapping () {
        const _mapping = []
        for (let [type, data] of Object.entries(this.props.manager.serviceTypes)) {
            _mapping.push({title: this.renderTitle(type, data), content: this.renderContent(type, data)})
        }
        return _mapping;
    }

    renderTitle (type, data) {
        return <_ text={data.name} />
    }

    renderContent (type, data) {
        return (<ServiceType type={data}  name={type} />);
    }
}
