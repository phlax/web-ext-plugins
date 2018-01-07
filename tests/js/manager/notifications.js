
import PluginNotifications from 'web-ext-plugins/manager/notifications';


test('PluginNotifications constructor', () => {
    const manager = {systemNotifications: {}}
    const notifications = new PluginNotifications(manager)
    notifications.validate = jest.fn(() => Promise.resolve())
    notifications.mutate = jest.fn((foo) => foo)
    // expect(notifications.registryId).toBe('notifications');
    let _notifications = {}
    return notifications.register(_notifications).then(() => {
        expect(browser.storage.local.get.mock.calls).toEqual([["notifications"]])
        expect(browser.storage.local.set.mock.calls[0]).toEqual([{notifications: {}}])
        _notifications = {foo: {result: 7}, bar: {result: 23}}
        return notifications.register(_notifications).then(() => {
            expect(browser.storage.local.set.mock.calls[1]).toEqual([{"notifications": _notifications}])
            browser.storage.local.get = jest.fn(() => Promise.resolve({"notifications": _notifications}))
            let newNotifications = {baz: {foo0: 'a', foo1: 'b'}}
            return notifications.register(newNotifications).then(() => {
                newNotifications.foo = _notifications.foo
                newNotifications.bar = _notifications.bar
                expect(browser.storage.local.set.mock.calls[2]).toEqual([{"notifications": newNotifications}])
            })
        })
    })
})


test('PluginNotifications notify', () => {
    const registry = {manager: {systemNotifications: {}}}
    const notifications = new PluginNotifications(registry)
    // expect(notifications.registryId).toBe('notifications');
    browser.storage.local.get = jest.fn(() => Promise.resolve({}))
    browser.notifications.create = jest.fn()
    const request = {message: 'BOOM'}
    // expire the cache
    notifications._cached_get = false
    return notifications.notify('foo', request).then(() => {
        expect(browser.storage.local.get.mock.calls).toEqual([["notifications"]])
        expect(browser.notifications.create.mock.calls).toEqual([])
        expect(browser.i18n.getMessage.mock.calls).toEqual([])
        browser.storage.local.get = jest.fn(() => Promise.resolve({notifications: {bar: {name: 'BAR'}}}))
        notifications._cached_get = false
        return notifications.notify('foo', request).then(() => {
            expect(browser.storage.local.get.mock.calls).toEqual([["notifications"]])
            expect(browser.notifications.create.mock.calls).toEqual([])
            expect(browser.i18n.getMessage.mock.calls).toEqual([])
            browser.storage.local.get = jest.fn(() => Promise.resolve({
                notifications: {
                    foo: {name: 'FOO'}},
                    bar: {name: 'BAR'}}))
            notifications._cached_get = false
            return notifications.notify('foo', request).then(() => {
                expect(browser.storage.local.get.mock.calls).toEqual([["notifications"]])
                expect(browser.notifications.create.mock.calls).toEqual(
                    [[{"message": "BOOM", "title": "L10N::FOO::L10N", "type": "basic"}]])
                expect(browser.i18n.getMessage.mock.calls).toEqual([["FOO"]])
            })
        })
    })
})
