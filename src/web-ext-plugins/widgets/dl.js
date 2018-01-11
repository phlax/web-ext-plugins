
import React from 'react';

import _ from 'web-ext-plugins/localized';


export class DT extends React.Component {

    render () {
        return (
            <dt>
              <_ text={this.props.text} />
            </dt>);
    }
}
