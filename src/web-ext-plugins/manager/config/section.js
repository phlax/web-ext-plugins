import React from 'react';

import ConfigLink from './link';

import _ from 'web-ext-plugins/localized';
import Img from 'web-ext-plugins/widgets/img';


export default class ConfigSection extends React.Component {

    render() {
        let className = '';
        if (!this.props.visible) {
            className = 'hidden';
        }
        return (
            <div id={this.props.id} className={className}>
              {this.renderTitle()}
              {this.renderConfigLink()}
              {this.props.children}
            </div>
        );
    }

    renderConfigLink () {
        return (
            <ConfigLink
               manager={this.props.manager}
               updateMenu={this.props.updateMenu} />);
    }

    renderTitle() {
        return (
            <h2>
              <Img src={this.props.icon} />
              <span><_ text={this.props.text} /></span>
            </h2>);
    }


}
