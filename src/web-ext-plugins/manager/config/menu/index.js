
import React from 'react';

import MenuList from './list';


export default class ConfigMenu extends React.Component {

    handleClick(evt, key) {
        evt.preventDefault();
        this.props.updateMenu(key);
    }

    render() {
        let menuClass = 'hidden';
        if (this.props.visible) {
            menuClass = '';
        }
        return (
            <div id="config-menu" className={menuClass}>
                {this.renderMenuList()}
            </div>);
    }

    renderMenuList() {
        return (
            <MenuList
               handleClick={this.handleClick.bind(this)}
               active={this.props.active}
               manager={this.props.manager} />);
    }

}
