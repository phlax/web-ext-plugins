
import React from 'react';

import 'react-tabs/style/react-tabs.css';

import Subheading from 'web-ext-plugins/widgets/sub-heading';
import _ from 'web-ext-plugins/localized'
import Tabbed from 'web-ext-plugins/widgets/tabs'

import AppsList from './list';
import RecommendedAppsList from './recommended';


export default class TabbedApps extends Tabbed {

    constructor(props) {
        super(props);
        this.state = {apps: {}};
    }

    get mapping () {
        return [
            {title: this.renderAppsTitle(), content: this.renderAppsContent()},
            {title: this.renderRecommendedTitle(), content: this.renderRecommendedContent()}]
    }

    renderAppsTitle () {
        return <_ text='appsInstalledList' />
    }

    renderRecommendedTitle () {
        return <_ text='appsRecommendedList' />
    }

    renderAppsContent () {
        return (
            <div>
              <Subheading text="appsInstalledList" />
              <AppsList
                 handleAppDelete={this.props.handleAppDelete}
                 apps={this.props.apps}
                 manager={this.props.manager} />
            </div>);
    }

    renderRecommendedContent () {
        return (
            <div>
              <Subheading text="appsRecommendedList" />
              <RecommendedAppsList
                 handleInstall={this.props.handleInstall}
                 recommended={this.props.recommended}
                 manager={this.props.manager} />
            </div>);
    }
}
