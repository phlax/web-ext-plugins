import React from 'react';

import AddonConfigInfo from './info';
import AddonAppConfig from './app';


export default class AddonConfig extends React.Component {

    constructor(props) {
        super(props);
        this.plugin = new this.pluginClass();
    }

    render() {
        return (
            <div>
              <AddonConfigInfo plugin={this.plugin} />
              <AddonAppConfig plugin={this.plugin} />
            </div>
        );
    }
}
