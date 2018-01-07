
import React from 'react';

import {shallow} from 'enzyme';

import ConfigMenu from 'web-ext-plugins/manager/config/menu';
import MenuList from 'web-ext-plugins/manager/config/menu/list';
import MenuItem from 'web-ext-plugins/manager/config/menu/item';


test('ConfigMenu render', () => {
    const config = shallow(<ConfigMenu />);
    expect(config.text()).toBe("<MenuList />")
});


test('ConfigMenuList render', () => {
    const mockManager = {
        configMenuItems: [
            {slug: 'preferences',
             name: "preferences",
             icon: '/images/preferences.svg'},
            {slug: 'notifications',
             name: "notifications",
             icon: '/images/notifications.svg'},
            {slug: 'apps',
             name: "webApps",
             icon: '/images/category-extensions.svg'}]}
    const active = new Set(mockManager.configMenuItems.map(item => item.slug))
    const config = shallow(<MenuList manager={mockManager} active={active} />);
    expect(config.text()).toBe("<MenuItem /><MenuItem /><MenuItem />")
});


test('ConfigMenuItem render', () => {
    const menuItem = {};
    const item = shallow(<MenuItem item={menuItem} />);
    expect(item.text()).toBe("<Container />")
});
