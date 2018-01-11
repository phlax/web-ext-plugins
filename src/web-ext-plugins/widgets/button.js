
import React from 'react';

import _ from 'web-ext-plugins/localized';


export default class Button extends React.Component {
    render () {
        return (
            <button
               {...this.props}
               onClick={this.props.onClick}>
              <_ text={this.props.text} />
            </button>);
    }
}
