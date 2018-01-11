
import React from 'react';
import ReactDOM from 'react-dom';

import ReactModal from 'react-modal';


const overlayStyles = {
    content : {
        top                   : '5%',
        left                  : '5%',
        right                 : 'auto',
        bottom                : 'auto',
        width: '80%',
        marginRight           : '-5%',
        transform             : 'translate(-5%, -5%)'
    }
};

class ModalButtons extends React.Component {

    render () {
        const style = {
            float: 'right',
            width: '20px',
            color: 'red'};
        return (
            <span><a href="#" style={style} data-target={this.props.id} onClick={this.props.onCloseRequest}>X</a></span>);
    }
}

export default class Modal {

    onCloseRequest (evt) {
        evt.preventDefault();
        this.kill(evt.target.dataset.target);
    }

    renderOverlay (id, title, content, props) {
        let {onCloseRequest} = props || {};
        onCloseRequest = onCloseRequest || this.onCloseRequest.bind(this);
        return (
            <ReactModal
               isOpen={true}
               style={overlayStyles}
               onClose={() => ReactDOM.unmountComponentAtNode(document.getElementById('overlay'))}>
              <ModalButtons
                 id={id}
                 onCloseRequest={onCloseRequest} />
              {title}
              {content}
            </ReactModal>);
    }

    kill (id) {
        ReactDOM.unmountComponentAtNode(document.getElementById(id));
    }

    overlay (id, content, props) {
        const overlay = document.createElement('div');
        overlay.id = id;
        document.body.appendChild(overlay);
        ReactDOM.render(this.renderOverlay(id, content, props), document.getElementById(id));
    }
}
