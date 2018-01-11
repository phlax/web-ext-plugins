
import React from 'react';

import SidebarAppsList from './list';
import Subheading from 'web-ext-plugins/widgets/sub-heading';


export default class SidebarApps extends React.Component {

    constructor(props) {
        super(props);
        this.state = {apps: []};
    }

    updateApps() {
        return this.props.manager.apps.get().then(apps => {
            this.setState({apps: apps});
        });
    }

    updateComponent () {
        return Promise.all([
            this.updateApps()])
    }

    componentDidMount () {
        this.updateComponent()
        browser.runtime.onMessage.addListener(this.handle.bind(this))
    }

    handle (request, sender, response) {
        const {message} = request
        if (['appAdded', 'appRemoved'].indexOf(message) !== -1) {
            return this.updateComponent().then(() => response())
        }
        return Promise.resolve()
    }

    render () {
        return (
            <div>
              {this.renderApps()}
            </div>);
    }

    renderApps () {
        const {apps} = this.state;
        if (apps.length > 0) {
            return (
                <div>
                  <Subheading text="appsInstalledList" />
                  <SidebarAppsList
                     apps={apps}
                     manager={this.props.manager} />
                </div>);
        }
        return <div />;
    }
}
