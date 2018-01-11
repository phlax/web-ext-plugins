import React from 'react';

import Button from 'web-ext-plugins/widgets/button';


export default class AppUpdateButtons extends React.Component {

    render() {
        return (
            <div>
              <Button
                 onClick={this.props.handleAppUpdate}
                 name={this.props.app.name}
                 data-url={this.props.app.url}
                 data-plugin={this.props.app.plugin.id}
                 text="appsUpdateAppButton" />
              <Button
                 onClick={this.props.handleAppDelete}
                 name={this.props.app.name}
                 data-type={this.props.app.type}
                 data-url={this.props.app.url}
                 data-plugin={this.props.app.plugin.id}
                 text="appsDeleteAppButton" />
            </div>);
    }
}
