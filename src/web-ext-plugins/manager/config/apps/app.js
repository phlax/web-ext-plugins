import React from 'react';

import AppUpdateButtons from './update';
import {Columns} from 'web-ext-plugins/widgets/split-container';
import Subheading from 'web-ext-plugins/widgets/sub-heading';
import PoweredBy from './powered-by';


export default class App extends Columns {

    get columns () {
        return [
            [this.renderIcon(), 1],
            [this._renderContent(), 3],
            [this.renderControls(), 3]];
    }

    renderControls () {
        return (
            <AppUpdateButtons
               handleAppDelete={this.props.handleAppDelete}
               handleAppUpdate={this.props.handleAppUpdate}
               app={this.props.app} />);
    }

    renderContent () {
        return (
            <div>
              <p><a href={this.props.app.url}>{this.props.app.url}</a></p>
              <p>updated: {this.props.app.updated}</p>
            </div>);
    }

    renderIcon () {
        return (<img src={this.props.app.plugin.icon} width="100%" />);
    }

    _renderContent () {
        return (
            <div>
              <Subheading>{this.props.app.name}</Subheading>
              {this.renderContent()}
              <PoweredBy app={this.props.app} manager={this.props.manager} />
            </div>);
    }
}
