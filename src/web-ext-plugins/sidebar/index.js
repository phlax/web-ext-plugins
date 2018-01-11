import React from 'react';

import SidebarSection from './section';


export default class PluginSidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {active: new Set(['apps'])};
    }

    updateMenu () {

    }

    renderSection(item) {
        const Section = item.component;
        return <Section manager={this.props.manager} />;
    }

    render() {
        const {active} = this.state;
        return (
            <div>
              {this.props.manager.sidebarItems.map((item, key) => {
                  if (active.has(item.slug)) {
                      return (
                          <SidebarSection
                             key={key}
                             updateMenu={this.updateMenu.bind(this)}
                             icon={item.icon}
                             text={item.title}
                             visible={true}
                             >
                            {this.renderSection(item)}
                          </SidebarSection>);
                  }
              })
              }
            </div>
        );
    }
}
