import React from 'react';

import TabbedPlugins from './tabbed';


export default class ConfigurePlugins extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: [], plugins: {}};
    }

    updatePlugins() {
        const $this = this;
        return this.props.manager.plugins.get().then(plugins => {
            $this.setState({
                plugins: plugins || {}});
            return true;
        });
    }

    componentDidMount() {
        const $this = this;
        browser.runtime.onMessage.addListener(request => {
            if (request.message && ['pluginAdded', 'pluginRemoved'].indexOf(request.message) !== -1) {
                return $this.updatePlugins();
            }
        });
        this.updatePlugins();
    }

    render() {
        return (
            <div>
              {this._renderInstalledPluginsList()}
            </div>
        );
    }

    _renderInstalledPluginsList() {
        const {plugins} = this.state;
        return (
            <TabbedPlugins manager={this.props.manager} plugins={plugins} />);
    }
}
