
import React from 'react';

import PluginInstalled from './plugin-installed';


export default class PluginsInstalledList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {plugins} = this.props;
        return (
            <ul>
              {Array.from(Object.values(plugins)).map((item, key) => {
                  return (
                      <PluginInstalled
                         manager={this.props.manager}
                         plugin={item}
                         key={key}
                         />);
              })}
            </ul>);
    }
}
