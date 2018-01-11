
import React from 'react';

import _ from 'web-ext-plugins/localized';
import Back from 'web-ext-plugins/widgets/back'
import Img from 'web-ext-plugins/widgets/img'

export default class ConfigLink extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick(evt) {
        evt.preventDefault();
        this.props.updateMenu();
    }

    render() {
        return (
            <div>
              <a className="config-link" href="#" onClick={this.handleClick.bind(this)}>
                <div>
                  {this.renderBack()}
                  {this.renderConfigIcon()}
                  {this.renderTitle()}
                </div>
              </a>
            </div>);
    }

    renderBack () {
        return <Back />
    }

    renderConfigIcon() {
        return <Img src="/images/category-extensions.svg" />
    }

    renderTitle() {
        return <_ text="toolsConfig" />;
    }
}
