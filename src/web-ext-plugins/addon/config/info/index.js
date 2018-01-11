import React from 'react';
import ReactMarkdown from 'react-markdown';


export default class AddonConfigInfo extends React.Component {

    render() {
        return (
            <div>
              <h2>
                <img src={this.props.plugin.pluginIcon} />
                <span>
                  L10n plugin: {this.props.plugin.pluginName}
                </span>
              </h2>
              <ReactMarkdown source={this.props.plugin.longDescription} />
              <h3>L10n plugin modules</h3>
              <ul>
                {this.props.plugin.provides.map((item, key) => {
                    return (
                        <li key={key}>{item}</li>);
                    })
                }
              </ul>
            </div>
        );
    }
}
