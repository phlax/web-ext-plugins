import React from 'react';

import ConfigMenu from './menu';
import ConfigSection from './section';


export default class PluginManagerConfig extends React.Component {

    constructor(props) {
        super(props);
        this.state = {menu: this.menuItems, active: new Set(['preferences', 'notifications', 'plugins'])};
    }

    get menuItems () {
        return new Map(this.props.manager.configMenuItems.map(k => [k.slug, false]));
    }

    _updateFromPlugins([k, types]) {
        this.props.manager.plugins.get(Object.keys(types)).then(plugins => {
            const {active} = this.state;
            if ([...plugins].length > 0) {
                if (!active.has(k)) {
                    active.add(k);
                }
            } else if (active.has(k)) {
                active.delete(k);
            }
            this.setState({active: active});
        });
    }

    componentDidMount () {
        this.updateComponent()
        browser.runtime.onMessage.addListener(this.handle.bind(this))
    }

    updateComponent () {
        const update = {
            apps: this.props.manager.appTypes,
            tools: this.props.manager.toolTypes,
            services: this.props.manager.serviceTypes};
        Object.entries(update).forEach(this._updateFromPlugins.bind(this));
    }

    handle (request) {
        const {message} = request
        if (['pluginRegistered', 'pluginRemoved'].indexOf(message) !== -1) {
            this.updateComponent()
        }
    }

    renderConfigMenu() {
        const {active, menu} = this.state;
        let showMenu = ![...menu].some(([, v]) => v === true);
        if (showMenu) {
            return (
                <ConfigMenu
                   manager={this.props.manager}
                   updateMenu={this.updateMenu.bind(this)}
                   active={active}
                   visible={showMenu} />);
        }
    }

    updateMenu(target) {
        let {menu} = this.state;
        if (target) {
            menu.set(target, true);
            this.setState({menu: menu});
        } else {
            this.setState({menu: this.menuItems});
        }
    }

    renderSection(item) {
        const Section = item.component;
        return <Section manager={this.props.manager} />;
    }

    render() {
        const {active, menu} = this.state;
        return (
            <div>
              {this.renderConfigMenu()}
              {this.props.manager.configMenuItems.map((item, key) => {
                  if (active.has(item.slug)) {
                      if (menu.get(item.slug)) {
                          return (
                              <ConfigSection
                                 key={key}
                                 updateMenu={this.updateMenu.bind(this)}
                                 icon={item.icon}
                                 text={item.title}
                                 visible={true}
                                  >
                                {this.renderSection(item)}
                              </ConfigSection>);
                      }
                  }
              })
              }
            </div>
        );
    }
}
