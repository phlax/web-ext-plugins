
import React from 'react';

import Img from 'web-ext-plugins/widgets/img';
import {Columns} from 'web-ext-plugins/widgets/split-container';
import Subheading from 'web-ext-plugins/widgets/sub-heading';


export default class MenuItem extends Columns {

    get columns () {
        return [
            [this.renderIcon(), 1],
            [this.renderContent(), 5]];
    }

    renderIcon () {
        const {item} = this.props;
        return (
            <Img src={item.icon} />);
    }

    renderContent () {
        const {item} = this.props;
        return (
            <Subheading text={item.name} />);
    }

    render () {
        return (
            <li onClick={this.props.onClick}>
              {super.render()}
            </li>);
    }
}
