
import React from 'react';

import 'react-tabs/style/react-tabs.css';

import _ from 'web-ext-plugins/localized'
import Tabbed from 'web-ext-plugins/widgets/tabs'

import ToolType from './type'


export default class TabbedTools extends Tabbed {

    get mapping () {
        const _mapping = []
        for (let [type, data] of Object.entries(this.props.manager.toolTypes)) {
            _mapping.push({title: this.renderTitle(type, data), content: this.renderContent(type, data)})
        }
        return _mapping;
    }

    renderTitle (type, data) {
        return <_ text={data.name} />
    }

    renderContent (type, data) {
        return (<ToolType type={data}  name={type} />);
    }
}
