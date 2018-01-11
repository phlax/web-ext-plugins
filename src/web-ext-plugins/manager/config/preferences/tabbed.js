
import React from 'react';

import 'react-tabs/style/react-tabs.css';

import _ from 'web-ext-plugins/localized'
import Tabbed from 'web-ext-plugins/widgets/tabs'

import PreferenceCategory from './category';


// import PreferenceType from './type'


export default class TabbedPreferences extends Tabbed {

    get mapping () {
        const _mapping = []
        let i = 0;
        for (let [type, data] of Object.entries(this.props.preferences)) {
            _mapping.push({title: this.renderTitle(type, data, i), content: this.renderContent(type, data, i)})
            i++;
        }
        return _mapping;
    }

    renderTitle (type, data) {
        return <_ text={type} l10n={data.plugin} />
    }

    renderContent (type, data, key) {
        return (
            <PreferenceCategory
               updatePrefs={this.props.updatePrefs}
               manager={this.props.manager}
               key={key}
               preferences={data.preferences}
               plugin={data.plugin}
               category={type}
               />);
    }
}
