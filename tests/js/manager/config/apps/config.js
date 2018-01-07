
import React from 'react';

import {mount, shallow} from 'enzyme';

import ConfigureApps from 'web-ext-plugins/manager/config/apps';


test('ConfigureApps render', () => {
    const manager = {
        recommended: {get: () => Promise.resolve([1, 2, 3])},
        apps: {
            get: jest.fn().mockReturnValue(Promise.resolve([1, 2, 3]))}}
    const config = shallow(<ConfigureApps manager={manager} />);
    expect(config.text()).toBe("<TabbedApps />")
})


test('ConfigureApps mount', () => {
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
    const recommendedData = {
        'foo.bar.app': [
            {url: 'URL0',
             name: 'NAME0',
             icon: 'RECOMMENDEDICON0'},
            {url: 'URL1',
             name: 'NAME1',
             icon: 'RECOMMENDEDICON1'},
            {url: 'URL2',
             name: 'NAME2',
             icon: 'RECOMMENDEDICON2'}]}
    const apps = Promise.resolve(appData)
    const recommendedApps = Promise.resolve({apps: recommendedData})
    let pluginData = {
        plugin0: {id: 'P0', name: 'PLUGIN0', provides: ['foo.baz.app'], icon: 'ICON0'},
        plugin1: {id: 'P1', name: 'PLUGIN1', provides: ['foo.bar.app'], icon: 'ICON1'}}
    const manager = {
        appTypes: {'foo.bar.app': {name: 'fooBarApp'}, 'foo.foo.app': {name: "fooFooApp"}},
        apps: {
            get: () => apps
        },
        recommended: {get: () => recommendedApps},
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
    browser.runtime.sendMessage = jest.fn(() => Promise.resolve())
    const config = mount(<ConfigureApps manager={manager} />);
    return recommendedApps.then(() => {
        expect(config.state().apps).toBe(appData)
        expect(config.state().recommended).toBe(recommendedData)
        config.update();
    }).then(() => {
        expect(config.text()).toBe(
            "L10N::appsInstalledList::L10NL10N::appsRecommendedList::L10NL10N::appsInstalledList::L10NNAME0URL0updated: powered byL10N::appsUpdateAppButton::L10NL10N::appsDeleteAppButton::L10NNAME1URL1updated: powered byL10N::appsUpdateAppButton::L10NL10N::appsDeleteAppButton::L10NNAME2URL2updated: powered byL10N::appsUpdateAppButton::L10NL10N::appsDeleteAppButton::L10N")

    });
})
