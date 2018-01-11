
import React from 'react';

import _ from 'web-ext-plugins/localized';


export class Select extends React.Component {
    render () {
        return (
            <select
                onChange={this.props.onChange}>
                {this.props.children}
            </select>);
    }
}


export class Option extends _ {

    render () {
        const {text} = this.state;
        return (
            <option
               value={this.props.value}
               onChange={this.props.onChange}>
              {text}
            </option>);
    }
}
