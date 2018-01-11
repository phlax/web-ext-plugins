
import React from 'react';

import Button from 'web-ext-plugins/widgets/button';


export default class InstallRecommendedButton extends React.Component {

    render() {
        return (
            <div>
              <Button
                 onClick={this.props.handleInstall}
                 name={this.props.app.name}
                 data-type={this.props.type}
                 data-plugin={this.props.app.plugin}
                 data-url={this.props.app.url}
                 text="appsInstallAppButton" />
            </div>);
    }
}
