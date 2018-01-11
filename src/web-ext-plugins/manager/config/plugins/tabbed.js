
import React from 'react';

import 'react-tabs/style/react-tabs.css';

import Subheading from 'web-ext-plugins/widgets/sub-heading';
import _ from 'web-ext-plugins/localized'
import Tabbed from 'web-ext-plugins/widgets/tabs'

import PluginsInstalledList from './list';


export default class TabbedPlugins extends Tabbed {

    constructor(props) {
        super(props);
        this.state = {plugins: {}};
    }

    get mapping () {
        return [
            {title: this.renderPluginsTitle(), content: this.renderPluginsContent()},
            {title: this.renderRecommendedTitle(), content: this.renderRecommendedContent()}]
    }

    renderPluginsTitle () {
        return <_ text='pluginsInstalledTab' />
    }

    renderRecommendedTitle () {
        return <_ text='pluginsRecommendedTab' />
    }

    renderPluginsContent () {
        return (
            <div>
              <Subheading text="pluginsInstalledList" />
              <PluginsInstalledList
                 plugins={this.props.plugins}
                 manager={this.props.manager} />
            </div>);
    }

    renderRecommendedContent () {
        return (
            <div>
              <Subheading text="pluginsRecommendedList" />
              Recommended...
            </div>);
    }
}
