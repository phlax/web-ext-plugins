
import React from 'react';


export default class Img extends React.Component {

    constructor(props) {
        super(props);
        this.state = {src: this.props.src}
    }

    componentDidMount () {
        if (!this.props.src) {
            return
        }
        if (this.props.resolve) {
            if (this.props.plugin) {
                const message = {message: 'resolveURL', url: this.props.src}
                browser.runtime.sendMessage(this.props.plugin, message).then(src => {
                    if (!src) {
                        return;
                    }
                    const {url} = src;
                    this.setState({src: url})
                })
            } else {
                this.setState({src: browser.extension.getURL(this.props.src)})
            }
        }
    }

    render () {
        const {src} = this.state;
        if (src) {
            return <img src={src} />
        }
        return <span />
    }
}
