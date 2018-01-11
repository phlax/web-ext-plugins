
import React from 'react';


export default class PoweredBy extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pluginData: {}};
    }

    componentDidMount() {
        this.props.manager.plugins.get().then(plugins => {
            this.setState({pluginData: plugins[this.props.app.plugin]});
        });
    }

    render () {
        const {pluginData} = this.state;
        const {icon, name} = pluginData || {};
        return (
            <div className="powered-by">
              <span>powered by</span>
              <span><img src={icon} /></span>
              <span>{name}</span>
            </div>);
    }
}
