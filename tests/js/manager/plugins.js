
import PluginRegistry from 'web-ext-plugins/manager/plugins';


test('PluginRegistry constructor', () => {
    const plugins = new PluginRegistry('foo')
    expect(plugins.manager).toBe('foo');
    expect(plugins.schema.id).toBe('plugins');
})


test('PluginRegistry register', () => {
    const manager = {systemNotifications: {}, notifications: {notify: () => Promise.resolve(jest.fn())}}
    const plugins = new PluginRegistry(manager)
    plugins.schema.id = "plugins"
    plugins.validate = jest.fn(() => Promise.resolve())
    let _plugins = {}
    return plugins.register(_plugins).then(() => {
        expect(browser.storage.local.get.mock.calls).toEqual([])
        _plugins = {sender: {id: 7}, provides: 23, name: 113, icon: 43, description: 73, longDescription: 117}
        plugins.updateRegistries = jest.fn(() => Promise.resolve())
        return plugins.register(_plugins).then(() => {
            let expected = {
                "plugins": {
                    "7": {
                        "description": 73,
                        "icon": 43,
                        "id": 7,
                        "longDescription": 117,
                        "name": 113,
                        "provides": 23}}}
            expect(browser.storage.local.set.mock.calls).toEqual([[expected]])
            expect(plugins.updateRegistries.mock.calls).toEqual([[_plugins]])
            browser.storage.local.get = jest.fn(() => Promise.resolve({plugins: expected.plugins}))
            let newPlugins = {sender: {id: 17}, provides: 123, name: 1113, icon: 143, description: 173, longDescription: 1117}
            plugins._cached_get = false
            return plugins.register(newPlugins).then(() => {
                expected.plugins["17"] = {
                    "description": 173,
                    "ext": {
                        "id": 17},
                    "icon": 143,
                    "id": 17,
                    "longDescription": 117,
                    "name": 1113,
                    "provides": 123}
                expect(browser.storage.local.set.mock.calls[1]).toEqual([{"plugins": expected.plugins}])
            })
        })
    })
})


test('PluginRegistry get', () => {
    const manager = {systemNotifications: {}}
    const plugins = new PluginRegistry(manager)
    browser.storage.local.get = jest.fn(() => Promise.resolve({}))
    return plugins.get().then((result) => {
        expect(result).toEqual({})
        expect(browser.storage.local.get.mock.calls).toEqual([['plugins']])
        plugins._cached_get = false
        browser.storage.local.get = jest.fn(() => Promise.resolve({plugins: 'foo'}))
        return plugins.get().then((result2) => {
            expect(result2).toBe('foo')
        })
    })
})


test('PluginRegistry updateRegistry', () => {
    const registry = {schema: {id: "bar"}, register: jest.fn(() => 23)}
    const plugin = {id: 'baz'}
    const plugins = new PluginRegistry('foo')
    plugins.validate = jest.fn(() => Promise.resolve())
    return plugins.updateRegistry(registry, plugin).then((result) => {
        expect(result).toBe(undefined)
        expect(registry.register.mock.calls).toEqual([]);
        plugin['bar'] = {some: {data: 13}, other: {data: 17}}
        return plugins.updateRegistry(registry, plugin).then((result) => {
            expect(result).toBe(23)
            expect(registry.register.mock.calls).toEqual(
                [[{some: {data: 13, plugin: 'baz'},
                   other: {data: 17, plugin: 'baz'}}]])
        })
    })
})


test('PluginRegistry updateRegistries', () => {
    const manager = {
        registries: [
            {schema: {id: 'apps'}},
            {schema: {id: 'notifications'}},
            {schema: {id: 'preferences'}},
            {schema: {id: 'services'}},
            {schema: {id: 'tools'}}]}
    const plugin = {id: 'baz'}
    const plugins = new PluginRegistry(manager)
    plugins.updateRegistry = jest.fn((registry, plug) => [registry, plug])
    return plugins.updateRegistries(plugin).then((result) => {
        expect(result).toEqual([])
        expect(plugins.updateRegistry.mock.calls).toEqual([])
        plugin['apps'] = {foo: 23, bar: 17}
        plugin['services'] = {foo: 23, bar: 17}
        return plugins.updateRegistries(plugin).then((result) => {
            expect(result).toEqual(
                [[{"schema": {id: 'apps'}}, plugin],
                 [{"schema": {id: 'services'}}, plugin]])
            expect(result).toEqual(plugins.updateRegistry.mock.calls)
        })
    })
})


test('PluginRegistry remove', () => {
    const manager = {systemNotifications: {}, notifications: {notify: jest.fn()}}
    const plugins = new PluginRegistry(manager)
    browser.storage.local.get = jest.fn(() => Promise.resolve({}))
    browser.storage.local.set = jest.fn(() => Promise.resolve({}))
    browser.runtime.sendMessage = jest.fn(() => Promise.resolve({}))
    plugins.removeRegistries = jest.fn(() => Promise.resolve())
    plugins.validate = jest.fn(() => Promise.resolve())
    return plugins.remove('foo').then(() => {
        expect(browser.storage.local.get.mock.calls[0]).toEqual([ 'plugins' ])
        expect(browser.storage.local.set.mock.calls).toEqual([])
        expect(plugins.removeRegistries.mock.calls).toEqual([])
        expect(browser.runtime.sendMessage.mock.calls).toEqual([])
        browser.storage.local.get = jest.fn(() => Promise.resolve({plugins: {bar: {name: 23}}}))
        return plugins.remove('foo').then(() => {
            expect(browser.storage.local.set.mock.calls).toEqual([])
            expect(plugins.removeRegistries.mock.calls).toEqual([])
            expect(browser.runtime.sendMessage.mock.calls).toEqual([])
            browser.storage.local.get = jest.fn(() => Promise.resolve({plugins: {foo: {name: 7}, bar: {name: 23}}}))
            plugins._cached_get = false
            return plugins.remove('foo').then(() => {
                expect(browser.storage.local.set.mock.calls).toEqual([[{"plugins": {"bar": {"name": 23}}}]])
                expect(plugins.removeRegistries.mock.calls).toEqual([["foo"]])
                expect(browser.runtime.sendMessage.mock.calls).toEqual(
                    [[{"data": {"bar": {"name": 23}}, "message": "registryUpdated", "type": "plugins"}],
                     [{"message": "pluginRemoved", "pluginName": 7}]])
            })
        })
    })
})


test('PluginRegistry removeRegistries', () => {
    const plugins = new PluginRegistry('foo')
    const registry = {remove: jest.fn(() => Promise.resolve(23))}
    return plugins.removeRegistry(registry, 7).then(result => {
        expect(registry.remove.mock.calls).toEqual([[7]])
        expect(result).toBe(23)
    })
})


test('PluginRegistry removeRegistry', () => {
    const manager = {
        registries: [
            {remove: jest.fn((arg) => Promise.resolve(arg))},
            {remove: jest.fn((arg) => Promise.resolve(arg))}]}
    const plugins = new PluginRegistry(manager)
    return plugins.removeRegistries(7).then(result => {
        expect(result).toEqual([7, 7])
        expect(manager.registries[0].remove.mock.calls).toEqual([[7]])
        expect(manager.registries[1].remove.mock.calls).toEqual([[7]])
    })
})
