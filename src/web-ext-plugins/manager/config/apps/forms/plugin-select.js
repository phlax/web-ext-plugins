import React from 'react';

import {Select, Option} from 'web-ext-plugins/widgets/select';


export default class PluginSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {sitePlugins: []};
    }

    componentDidMount() {
        const $this = this;
        this.props.manager.plugins.get(Object.keys(this.props.manager.appTypes)).then(plugins => {
            $this.setState({sitePlugins: Array.from(plugins.values())});
            if (plugins.length) {
                $this.setState({addType: plugins.values()[0].id});
            }
        });
    }

    handleTypeChange(evt) {
        this.props.form.handleTypeChange(evt.target.value);
    }

    render() {
        const {sitePlugins} = this.state;
        return (
            <Select onChange={this.handleTypeChange.bind(this)}>
              <Option value="" text="appsSelectPluginType" />
              {sitePlugins.map((item, key) => {
                  return (
                      <Option
                         key={key}
                         value={item.id}
                         l10n={item.id}
                         text={item.name} />);
              })
              }
            </Select>);
    }
}
