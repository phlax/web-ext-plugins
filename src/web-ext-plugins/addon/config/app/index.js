import React from 'react';


export default class AddonAppConfig extends React.Component {

    constructor(props) {
        super(props);
        this.state = {apps: []};
    }

    componentDidMount() {
        const $this = this;
        this.props.plugin.getInstalledApps().then(apps => {
            $this.setState({apps: apps});
        });
    }

    render() {
        const {apps} = this.state;
        return (
            <div>
              <h3>Installed apps</h3>
              <ul>
                {apps.map((item, key) => {
                    return (
                        <li key={key}>{item.name}</li>);
                    })
                }
              </ul>
            </div>
        );
    }
}
