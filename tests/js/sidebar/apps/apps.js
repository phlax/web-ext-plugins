
import React from 'react';

import {shallow} from 'enzyme';

import SidebarApps from 'web-ext-plugins/sidebar/apps'


test('SidebarApps render', () => {
    const manager = {apps: {get: () => Promise.resolve([])}}
    const config = shallow(<SidebarApps manager={manager} />);
    expect(config.text()).toBe("")
})
