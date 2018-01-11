
import React from 'react';

import _ from 'web-ext-plugins/localized';


export default class TextInput extends _ {

    get localizedName () {
        return "placeholder"
    }

    render () {
        return (
            <input
               type="text"
               onChange={this.props.onChange}
               placeholder={this.localizedText} />);
    }
}
