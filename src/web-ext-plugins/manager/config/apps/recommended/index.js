import React from 'react';

import AppList from './list';


export default class RecommendedAppsList extends React.Component {

    render() {
        return (
            <ul>
                {Object.entries(this.props.recommended).map(([type, apps], key) => {
                    const apptype = this.props.manager.appTypes[type];
                    return (
                        <AppList
                           key={key}
                           itemkey={key}
                           type={type}
                           apptype={apptype}
                           handleInstall={this.props.handleInstall}
                           manager={this.props.manager}
                           apps={apps} />);
                    })
                }
            </ul>);
    }
}
