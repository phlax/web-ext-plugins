
import RunAmock from 'web-ext-plugins/mock/amock';

import PluginManager from 'web-ext-plugins/manager';
const plugins = require('web-ext-plugins/manager/plugins');
const handler = require('web-ext-plugins/manager/handler');
const apps = require('web-ext-plugins/manager/apps');
const recommended = require('web-ext-plugins/manager/recommended');
const notifications = require('web-ext-plugins/manager/notifications');

import configMenuItems from 'web-ext-plugins/manager/config/menu/items'


const constructors = {
    plugins: [plugins, 'default', {key: "PLUGINS"}],
    handler: [handler, 'default', {key: "HANDLER"}],
    apps: [apps, 'default', {key: "APPS"}],
    recommended: [recommended, 'default', {key: "RECOMMENDED"}],
    notifications: [notifications, 'default', {key: "NOTIFICATIONS", register: jest.fn(),notify: jest.fn((x) => Promise.resolve(x))}]}


test('Plugin manager constructor', () => {
    const amock = new RunAmock();
    amock.withMockedConstructors(Object.values(constructors), () => {
	const manager = new PluginManager();
	expect(plugins.default.mock.calls[0][0]).toBe(manager)
	expect(manager.plugins.key).toBe("PLUGINS")
	expect(handler.default.mock.calls[0][0]).toBe(manager)
	expect(manager.handler.key).toBe("HANDLER")
	expect(apps.default.mock.calls[0][0]).toBe(manager)
	expect(manager.apps.key).toBe("APPS")
	expect(recommended.default.mock.calls[0][0]).toBe(manager)
	expect(manager.recommended.key).toBe("RECOMMENDED")
	expect(notifications.default.mock.calls[0][0]).toBe(manager)
	expect(manager.notifications.key).toBe("NOTIFICATIONS")
        expect(manager.appTypes).toEqual({})
        expect(manager.serviceTypes).toEqual({})
        expect(manager.toolTypes).toEqual({})
        expect(manager.registries).toEqual([
            manager.notifications,
            manager.preferences,
            manager.recommended,
            manager.services,
            manager.tools])
        const systemNotifications = {
            pluginRegistered: {
                category: "notificationsSystem",
                name: "notifyPluginRegistered",
                default: true},
            pluginRemoved: {
                category: "notificationsSystem",
                name: "notifyPluginRemoved",
                default: true},
            appAdded: {
                category: "notificationsSystem",
                default: true,
                name: "notifyAppAdded",
            },
            appRemoved: {
                category: "notificationsSystem",
                default: true,
                name: "notifyAppRemoved",
            }}
        expect(manager.systemNotifications).toEqual(systemNotifications)
        expect(manager.configMenuItems).toBe(configMenuItems)
    })
})


test('Plugin manager setup', () => {
    let _constructors = {};
    Object.assign(_constructors, constructors)
    _constructors.handler[2] = {addListeners: jest.fn()};
    const amock = new RunAmock();
    amock.withMockedConstructors(Object.values(_constructors), () => {
	const manager = new PluginManager();
	manager.setup()
	expect(manager.handler.addListeners.mock.calls).toEqual([[]])
    })
})
