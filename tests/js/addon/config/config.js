
import React from 'react';

import {shallow} from 'enzyme';

import AddonConfig from 'web-ext-plugins/addon/config';
import AddonConfigInfo from 'web-ext-plugins/addon/config/info';


test('AddonConfig render', () => {

    class MockPlugin {

    }

    class MockAddonConfig extends AddonConfig {

        get pluginClass () {
            return MockPlugin
        }
    }
    const config = shallow(<MockAddonConfig />);
    expect(config.text()).toBe(
        "<AddonConfigInfo /><AddonAppConfig />")
})


test('AddonConfigInfo render', () => {
    const plugin = {pluginIcon: "FOOICON", pluginName: "FOONAME", longDescription: "FOOLONGDESC", provides: [1, 2, 3]}
    const config = shallow(<AddonConfigInfo plugin={plugin} />);
    expect(config.text()).toBe("L10n plugin: FOONAME<ReactMarkdown />L10n plugin modules123")
})
