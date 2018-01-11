import React from 'react';

import SidebarApp from './app';


export default class SidebarAppsList extends React.Component {

    render() {
        return (
            <ul>
              {this.props.apps.map((app, key) => {
                  return (
                      <SidebarApp
                         manager={this.props.manager}
                         key={key}
                         app={app} />);
              })}
            </ul>);
    }
}
