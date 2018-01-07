
import React from 'react';

import {mount, shallow} from 'enzyme';

import ConfigurePlugins from 'web-ext-plugins/manager/config/plugins';


test('ConfigurePlugins render', () => {
    const manager = {plugins: {get: jest.fn().mockReturnValue(Promise.resolve([1, 2, 3]))}}
    const config = shallow(<ConfigurePlugins manager={manager} />);
    expect(config.text()).toBe("<TabbedPlugins />");
})


test('ConfigurePlugins mount', () => {
    const appData = [
        {url: 'URL0',
         name: 'NAME0',
         plugin: {icon: 'ICON0'}},
        {url: 'URL1',
         name: 'NAME1',
         plugin: {icon: 'ICON1'}},
        {url: 'URL2',
         name: 'NAME2',
         plugin: {icon: 'ICON2'}}
        ]
    const plugins = Promise.resolve(appData)
    let pluginData = {
        plugin0: {id: 'P0', name: 'PLUGIN0', provides: ['foo.baz.app']},
        plugin1: {id: 'P1', name: 'PLUGIN1', provides: ['foo.bar.app']}}
    const manager = {
        appTypes: ['foo.bar.app', 'foo.foo.app'],
        plugins: {
            get: jest.fn(providing => {
                if (providing) {
                    pluginData = new Map(
                        Object.entries(pluginData).filter(x => {
                            return x[1].provides.some(r => providing.includes(r))
                        }))
                }
                return Promise.resolve(pluginData)
            })
        }
    }
    const config = mount(<ConfigurePlugins manager={manager} />);
    return plugins.then(() => {
        expect(config.state().plugins).toBe(pluginData)
        config.update();
    }).then(() => {
        expect(config.text()).toBe(
            "L10N::pluginsInstalledTab::L10NL10N::pluginsRecommendedTab::L10NL10N::pluginsInstalledList::L10NPLUGIN0PLUGIN1")
    });
})
