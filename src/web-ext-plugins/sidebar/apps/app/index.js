import React from 'react';


export default class SidebarApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle(evt) {
        evt.preventDefault();
        const {open} = this.state;
        this.setState({open: !open});
    }

    renderSidebarComponent () {
        const SidebarComponent = this.props.manager.appTypes[this.props.app.type].sidebar;
        return (
                <SidebarComponent
                   manager={this.props.manager}
                   app={this.props.app} />);
    }

    render() {
        const {open} = this.state;
        let className = '';
        if (!open) {
            className = 'hidden';
        }
        return (
            <dl>
              <dt><a href="#" onClick={ this.handleToggle.bind(this) }>&gt;</a>
                <img src={ this.props.app.plugin.icon } width="22px"/>
                <a href={this.props.app.url}>{this.props.app.name}</a>
              </dt>
              <dd className={className}>
                {this.renderSidebarComponent()}
              </dd>
            </dl>
        );
    }
}
