
import React from 'react';

import NumericInput from 'react-numeric-input';


export default class PreferenceInteger extends React.Component {

    render () {
        return (
            <NumericInput
               value={this.props.preference.value}
               onChange={this.props.onChange}
               className="form-controls" />);
    }
}
