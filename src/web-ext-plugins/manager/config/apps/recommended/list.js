import React from 'react';

import RecommendedApp from './app';


export default class AppsList extends React.Component {

    render() {
        return (
            <li>
              <ul>
                {Object.entries(this.props.apps).map(([name, app], key) => {
                    return (
                        <RecommendedApp
                           handleInstall={this.props.handleInstall}
                           manager={this.props.manager}
                           name={name}
                           type={this.props.type}
                           key={key}
                           app={app} />);
                })
                }
            </ul>
           </li>
        );
    }
}
