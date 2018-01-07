
import React from 'react';

import {shallow} from 'enzyme';

import ConfigSection from 'web-ext-plugins/manager/config/section';
import PluginManagerConfig from 'web-ext-plugins/manager/config';
import configMenuItems from 'web-ext-plugins/manager/config/menu/items';


test('PluginManagerConfig render', () => {
    const manager = {
        configMenuItems: configMenuItems,
        appTypes: [1, 2, 3],
        toolTypes: [1, 2, 3],
        serviceTypes: [1, 2, 3],
        plugins: {get: () => Promise.resolve(new Map([['foo', 1], ["bar", 2]]))}}
    const config = shallow(<PluginManagerConfig manager={manager} />);
    expect(config.text()).toBe("<ConfigMenu />")
})


test('ConfigSection render', () => {
    const manager = {configMenuItems: configMenuItems}
    const config = shallow(<ConfigSection manager={manager} />);
    expect(config.text()).toBe("<Img /><Localized /><ConfigLink />")
})
