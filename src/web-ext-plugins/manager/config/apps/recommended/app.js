import React from 'react';

import Img from 'web-ext-plugins/widgets/img';
import InstallRecommendedButton from './install';
import App from '../app';


export default class RecommendedApp extends App {

    renderControls () {
        return (
            <InstallRecommendedButton
               handleInstall={this.props.handleInstall}
               type={this.props.type}
               app={this.props.app} />);
    }

    renderContent () {
        return (
            <div>
              <p><a href={this.props.app.url}>{this.props.app.url}</a></p>
            </div>);
    }

    renderIcon () {
        return (
            <Img src={this.props.app.icon} resolve={true} plugin={this.props.app.plugin} />);
    }
}
