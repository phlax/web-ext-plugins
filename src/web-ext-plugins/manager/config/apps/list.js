
import React from 'react';

import App from './app';


export default class AppsList extends React.Component {

    render() {
        return (
            <ul>
              {this.props.apps.map((app, key) => {
                  return (
                      <App
                         handleAppDelete={this.props.handleAppDelete}
                         handleAppUpdate={this.props.handleAppUpdate}
                         manager={this.props.manager}
                         key={key}
                         app={app} />);
              })}
            </ul>);
    }
}
