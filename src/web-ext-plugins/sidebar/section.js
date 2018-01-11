import React from 'react';

import _ from 'web-ext-plugins/localized';
import Img from 'web-ext-plugins/widgets/img';


export default class SidebarSection extends React.Component {

    render() {
        let className = '';
        if (!this.props.visible) {
            className = 'hidden';
        }
        return (
            <section id={this.props.id} className={className}>
              {this.renderTitle()}
              {this.props.children}
            </section>
        );
    }

    renderTitle() {
        return (
            <h2>
              <Img src={this.props.icon} />
              <span><_ text={this.props.text} /></span>
            </h2>);
    }


}
