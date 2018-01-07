
import PluginApps from 'web-ext-plugins/manager/apps';


test('PluginApps register', () => {
    const manager = {appTypes: {}}
    const apps = new PluginApps(manager)
    let _apps = []
    apps.schema.id = "apps"
    apps.validate = jest.fn(() => Promise.resolve())
    return apps.register(_apps).then(() => {
        expect(browser.storage.local.get.mock.calls).toEqual([["apps"]])
        expect(browser.storage.local.set.mock.calls[0]).toEqual([{apps: []}])
        _apps = [{foo: 7}, {bar: 23}]
        return apps.register(_apps).then(() => {
            expect(browser.storage.local.set.mock.calls[1]).toEqual([{"apps": _apps}])
            browser.storage.local.get = jest.fn(() => Promise.resolve({"apps": _apps}))
            let newApps = [{foo0: 'a'}, {foo1: 'b'}]
            return apps.register(newApps).then(() => {
                newApps.foo = _apps.foo
                newApps.bar = _apps.bar
                expect(browser.storage.local.set.mock.calls[2]).toEqual(
                    [{"apps": [{"foo": 7}, {"bar": 23}, {"foo0": "a"}, {"foo1": "b"}]}])
            })
        })
    })
})


test('PluginApps get', () => {
    const manager = {appTypes: {}, plugins: {get: jest.fn(() => Promise.resolve({X: 7, Y: 23}))}}
    const papps = new PluginApps(manager)
    browser.storage.local.get = jest.fn(() => Promise.resolve({"apps": []}))
    return papps.get().then(apps => {
        expect(apps).toEqual([])
        expect(browser.storage.local.get.mock.calls).toEqual([['apps']])
        browser.storage.local.get = jest.fn(() => Promise.resolve(
            {"apps": [
                {name: 'foo', plugin: "X", type: "a", info: "XZ"},
                {name: 'bar', plugin: "Y", type: "b", info: "XY"}]}))
        return papps.get().then(apps => {
            expect(browser.storage.local.get.mock.calls).toEqual([['apps']])
            expect(apps).toEqual(
                [{"info": "XZ", "name": "foo", "plugin": 7, "type": "a"},
                 {"info": "XY", "name": "bar", "plugin": 23, "type": "b"}])
            return papps.get({join: ['plugin']}).then(apps => {
                expect(apps).toEqual(
                    [{"info": "XZ", "name": "foo", "plugin": 7, "type": "a"},
                     {"info": "XY", "name": "bar", "plugin": 23, "type": "b"}])
                return papps.get({join: false}).then(apps => {
                    expect(apps).toEqual(
                        [{"info": "XZ", "name": "foo", "plugin": "X", "type": "a"},
                         {"info": "XY", "name": "bar", "plugin": "Y", "type": "b"}])
                })
            })
        })
    })
})


test('PluginApps _mangleToArray', () => {
    // returns [] if it receives an object, or empty iterable
    const papps = new PluginApps('foo')
    expect(papps._mangleToArray({})).toEqual([])
    expect(papps._mangleToArray([1, 2, 3])).toEqual([1, 2, 3])
    expect(papps._mangleToArray({foo: 1, bar: 2})).toEqual([])
})


test('PluginApps _notifyAppChange', () => {
    const manager = {notifications: {notify: jest.fn()}}
    const papps = new PluginApps(manager)
    browser.runtime.sendMessage = jest.fn(() => Promise.resolve())
    return papps._notifyAppChange('foo', 'bar', 'baz').then(() => {
        expect(browser.runtime.sendMessage.mock.calls).toEqual(
            [[{message:'bar',data:'foo'}]])
        expect(manager.notifications.notify.mock.calls).toEqual(
            [['bar',{message:'baz'}]])
    })
})


test('PluginApps install', () => {
    const manager = {updater: {updateApps: () => Promise.resolve()}}
    const papps = new PluginApps(manager)
    browser.storage.local.get = jest.fn(() => Promise.resolve({"apps": [1, 2, 3]}))
    browser.storage.local.set = jest.fn(() => Promise.resolve())
    browser.runtime.sendMessage = jest.fn(() => Promise.resolve())
    papps._notifyAppChange = jest.fn(() => Promise.resolve('x'))
    Date.now = jest.fn(() => 23)
    papps.schema.id = "apps"
    papps.validate = jest.fn(() => Promise.resolve())
    return papps.install('X', 'foo', 'bar', 'baz').then(result => {
        expect(browser.storage.local.get.mock.calls).toEqual([['apps']])
        const expected = [1, 2, 3, {url: 'baz', type: 'foo', name: 'bar', plugin: 'X', updated: 23}]
        expect(browser.storage.local.set.mock.calls).toEqual([[{apps: expected}]])
        expect(result).toEqual(expected)
        expect(papps._notifyAppChange.mock.calls).toEqual(
            [[{url:'baz', plugin: 'X', type:'foo', name:'bar', updated:23}, 'appAdded', 'bar']])
        // registry is updated
        expect(browser.runtime.sendMessage.mock.calls).toEqual(
            [[{ message: 'registryUpdated', type: 'apps', data: expected}]])
    })
})


test('PluginApps save', () => {
    const manager = {updater: {updateApps: () => Promise.resolve()}}
    const papps = new PluginApps(manager)
    browser.storage.local.set = jest.fn(() => Promise.resolve())
    browser.runtime.sendMessage = jest.fn(() => Promise.resolve())
    papps._notifyAppChange = jest.fn(() => Promise.resolve('x'))
    papps.validate = jest.fn(() => Promise.resolve())
    return papps.save([1, 2, 3], {name: 'bar'}, 'baz').then(result => {
        expect(browser.storage.local.set.mock.calls).toEqual([[{"apps": [1, 2, 3]}]])
        expect(result).toEqual([1, 2, 3])
        expect(papps._notifyAppChange.mock.calls).toEqual([[{"name": "bar"}, "baz", "bar"]])
        // registry is updated
        expect(browser.runtime.sendMessage.mock.calls).toEqual(
            [[{"data": [1, 2, 3], "message": "registryUpdated", "type": "apps"}]])
    })
})


test('PluginApps remove', () => {
    // const manager = {updater: {updateApps: () => Promise.resolve()}}
    const papps = new PluginApps('foo')
    browser.storage.local.get = jest.fn(() => Promise.resolve({apps: []}))
    papps.save = jest.fn(() => Promise.resolve(23))
    return papps.remove({type: 'foo', name: 'bar', url: 'baz'}).then(result => {
        expect(result).toBe(undefined)
        expect(browser.storage.local.get.mock.calls).toEqual([['apps']])
        expect(papps.save.mock.calls).toEqual([])
        browser.storage.local.get = jest.fn(() => Promise.resolve({
            apps: [{type: 'foo2', name: 'bar', url: 'baz'}]}))
        return papps.remove({type: 'foo', name: 'bar', url: 'baz'}).then(result => {
            expect(result).toBe(undefined)
            expect(browser.storage.local.get.mock.calls).toEqual([['apps']])
            expect(papps.save.mock.calls).toEqual([])
            browser.storage.local.get = jest.fn(() => Promise.resolve({
                apps: [
                    {type: 'foo', name: 'bar', url: 'baz'},
                    {type: 'foo2', name: 'bar', url: 'baz'}]}))
            return papps.remove({type: 'foo', name: 'bar', url: 'baz'}).then(result => {
                expect(result).toBe(23)
                expect(browser.storage.local.get.mock.calls).toEqual([['apps']])
                expect(papps.save.mock.calls).toEqual(
                    [[[
                        {"name": "bar", "type": "foo2", "url": "baz"}
                    ],
                      {"name": "bar", "type": "foo", "url": "baz"},
                      "appRemoved"]])
            })
        })
    })
})
