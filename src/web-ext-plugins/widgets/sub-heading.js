
import React from 'react';

import _ from 'web-ext-plugins/localized'


export default class Subheading extends React.Component {
    render () {
        if (this.props.children) {
            return <h3>{this.props.children}</h3>;
        }
        return <h3><_ text={this.props.text} l10n={this.props.l10n} /></h3>;
    }
}
