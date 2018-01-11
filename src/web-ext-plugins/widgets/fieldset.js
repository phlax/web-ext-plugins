
import React from 'react';

import _ from 'web-ext-plugins/localized';


export default class Fieldset extends React.Component {

    get children () {
        return this.props.children || "";
    }

    render () {
        return (
            <fieldset>
              <legend>
                <_ text={this.props.legend} />
              </legend>
              {this.children}
            </fieldset>);
    }
}
