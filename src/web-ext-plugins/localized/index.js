
import React from 'react';

import logger from 'web-ext-plugins/logger'
import Localizer from './localizer'


const localizer = new Localizer()


export default class Localized extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.state[this.localizedName] = ""
        this.localizer = localizer
    }

    get localizedName () {
        return "text"
    }

    get text () {
        return this.props[this.localizedName]
    }

    get localizedText () {
        return this.state[this.localizedName] || ""
    }

    shouldLocalize () {
        return Boolean((!this.props.localize || this.props.localize !== false) && this.text)
    }

    get l10n () {
        return this.props.l10n;
    }

    componentDidMount () {
        if (this.shouldLocalize()) {
            const update = {}
            this.localizer.localize(this.text, this.l10n).then(result => {
                logger.log(this, 'getting localization _', this.props)
                update[this.localizedName] = result;
                logger.log(this, 'got localization _', update[this.localizedName])
                this.setState(update)
            })
        }
    }

    render () {
        return this.localizedText;
    }
}
