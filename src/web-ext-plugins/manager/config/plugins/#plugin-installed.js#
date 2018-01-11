
import React from 'react';

import ReactMarkdown from 'react-markdown';

import {Columns} from 'web-ext-plugins/widgets/split-container';
import Subheading from 'web-ext-plugins/widgets/sub-heading';


export default class PluginInstalled extends Columns {

    get columns () {
        return [
            [this.renderIcon(), 1],
            [this.renderContent(), 5]];
    }

    renderIcon () {
        return <img src={this.props.plugin.icon} width="48px" />;
    }

    renderContent () {
        return (
            <div>
              <Subheading l10n={this.props.plugin.id}>{this.props.plugin.name}</Subheading>
              <h4>{this.props.plugin.description}</h4>
              <ReactMarkdown source={this.props.plugin.longDescription} />
            </div>);
    }
}
