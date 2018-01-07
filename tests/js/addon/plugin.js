
import {NotImplementedError} from 'web-ext-plugins/errors';

import RunAmock from 'web-ext-plugins/mock/amock';

import AddonPlugin from 'web-ext-plugins/addon/plugin';

const handler = require('web-ext-plugins/addon/handler');
const manager = require('web-ext-plugins/addon/manager');


const constructors = {
    manager: [manager, 'default', {key: "MANAGER"}],
    handler: [handler, 'default', {key: "HANDLER"}]}


test('AddonPlugin constructor', () => {
    const amock = new RunAmock();
    amock.withMockedConstructors(Object.values(constructors), () => {
        const plugin = new AddonPlugin();
        expect(manager.default.mock.calls[0][0]).toBe(plugin);
        expect(plugin.manager.key).toBe("MANAGER");
        expect(handler.default.mock.calls[0][0]).toBe(plugin);
        expect(plugin.handler.key).toBe("HANDLER");
        expect(() => {
            plugin.managerId
        }).toThrow(NotImplementedError);
        browser.runtime.getManifest = jest.fn(() => {return {name: 'NAME'}})
        expect(plugin.pluginName).toBe('NAME');
        plugin.name = 'NOTNAME'
        expect(plugin.pluginName).toBe('NOTNAME');
        browser.runtime.getManifest = jest.fn(() => {return {description: 'DESCRIPTION'}})
        expect(plugin.pluginDescription).toBe('DESCRIPTION');
        plugin.description = 'NOTDESCRIPTION'
        expect(plugin.pluginDescription).toBe('NOTDESCRIPTION');
        plugin.icon = "ICON"
        expect(plugin.pluginIcon).toBe('URL::ICON::URL');
        expect(plugin.pluginData).toEqual({
            name: plugin.pluginName,
            icon: plugin.pluginIcon,
            description: plugin.pluginDescription,
            longDescription: plugin.longDescription,
            apps: plugin.apps,
            tools: plugin.tools,
            notifications: plugin.notifications,
            preferences: plugin.preferences,
            services: plugin.services,
            provides: plugin.provides})
    })
})


test('AddonPlugin registerPlugin', () => {
    const amock = new RunAmock();
    let _constructors = {};
    Object.assign(_constructors, constructors)
    _constructors.manager[2] = {registerPlugin: jest.fn().mockReturnValue(Promise.resolve(23))};
    _constructors.handler[2] = {addListeners: jest.fn()};
    amock.withMockedConstructors(Object.values(constructors), () => {
        const plugin = new AddonPlugin();
        return plugin.setup().then(() => {
            expect(plugin.manager.registerPlugin.mock.calls).toEqual([[]])
            expect(plugin.handler.addListeners.mock.calls).toEqual([[]])
        })
    })
})
