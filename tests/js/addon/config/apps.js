
import React from 'react';

import {shallow} from 'enzyme';

import AddonAppsConfig from 'web-ext-plugins/addon/config/app';


test('AddonAppsConfig render', () => {
    const plugin = {getInstalledApps: () => Promise.resolve([1, 2, 3])}
    const config = shallow(<AddonAppsConfig plugin={plugin} />);
    expect(config.text()).toBe("Installed apps")
})
