
import React from 'react';

import Modal from 'web-ext-plugins/widgets/modal';
import Button from './button';


export class OverlayLink  extends React.Component {

    renderOverlay (content) {
        const modal = new Modal();
        // use a random uuid ?
        modal.overlay(this.props.id, content);
        // make this more intelligent.
        document.getElementById('config').style.minHeight = "50em";
    }

    overlayContent (evt) {
        evt.preventDefault()
        this.renderOverlay(this.props.children);
    }

    render() {
        return (
            <a
               href='#'
               onClick={this.overlayContent.bind(this)}>
                {this.props.text}
            </a>);
    }

}


export class OverlayButton  extends React.Component {

    renderOverlay (content) {
        const modal = new Modal();
        // use a random uuid ?
        modal.overlay(this.props.id, content);
        // make this more intelligent.
        document.getElementById('config').style.minHeight = "50em";
    }

    overlayContent () {
        this.renderOverlay(this.props.children);
    }

    render() {
        return (
            <Button
               onClick={this.overlayContent.bind(this)}
               text={this.props.text} />);
    }

}
