
import React from 'react';

import {shallow} from 'enzyme';

import PluginSidebar from 'web-ext-plugins/sidebar'


test('PluginSidebar render', () => {
    const manager = {sidebarItems: []}
    const config = shallow(<PluginSidebar manager={manager} />);
    expect(config.text()).toBe(
        "")
})
