
import React from 'react';

import {NotImplementedError} from 'web-ext-plugins/errors'
import Subheading from 'web-ext-plugins/widgets/sub-heading';


export class ExtensibleConfiguration extends React.Component {

    get configComponent() {
        throw new NotImplementedError()
    }

    render() {
        const ConfigComponent = this.configComponent;
        return (
            <ConfigComponent
               manager={this.props.manager} />
        );
    }

}


export class ExtensibleConfigurationList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {types: {}}
    }

    get configComponent() {
        throw new NotImplementedError()
    }

    componentDidMount() {
        this.getTypes().then(results => {
            const result = {};
            for (let [name, type] of Object.entries(results)) {
                if (Object.keys(type).length > 0) {
                    result[name] = this.types[name];
                }
            }
            this.setState({types: result});
        });
    }

    render() {
        const {types} = this.state;
        const ConfigComponent = this.configComponent;
        return (
            <ul>
              {Object.entries(types).map(([name, type], key) => {
                  return (
                      <ConfigComponent
                         manager={this.props.manager}
                         key={key}
                         type={type}
                         name={name}
                         />);
              })}
            </ul>);
    }
}


export class ExtensibleConfigurationType extends React.Component {

    get renderConfig() {
        throw new NotImplementedError()
    }

    render() {
        return (
            <div>
              <Subheading text={this.props.type.name} />
              <ul>
                {this.renderConfig(this.props.name)}
              </ul>
            </div>);
    }
}
