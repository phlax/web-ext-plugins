
import React from 'react';


export default class PreferenceBoolean extends React.Component {

    render () {
        return (
            <input
               type='checkbox'
               value={this.props.preference.value}
               checked={this.props.preference.value}
               onChange={this.props.onChange}
               />);
    }

}
