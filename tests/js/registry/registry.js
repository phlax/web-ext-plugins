
import Registry from 'web-ext-plugins/registry';


test('Registry remove', () => {

    class MockRegistry extends Registry {

        get schema () {
            return {id: 'REGID'}
        }
    }

    const registry = new MockRegistry('foo')
    browser.storage.local.get = jest.fn(() => Promise.resolve({}))
    browser.storage.local.set = jest.fn(() => Promise.resolve(23))
    browser.runtime.sendMessage = jest.fn(() => Promise.resolve())
    return registry.remove('x').then(result => {
        expect(result).toBe(undefined)
        expect(browser.storage.local.get.mock.calls).toEqual([["REGID"]])
        expect(browser.storage.local.set.mock.calls).toEqual([])
        expect(browser.runtime.sendMessage.mock.calls).toEqual([])
        const registryData = {
            REGID: {
                foo: {plugin: 'x', data: 23},
                bar: {plugin: 'y', data: 7},
                baz: {nothing: {here: {}}}}}
        browser.storage.local.get = jest.fn(() => Promise.resolve(registryData))
        registry._cached_get = false;
        return registry.remove('x').then(result => {
            expect(result).toBe(undefined)
            expect(browser.storage.local.get.mock.calls).toEqual([["REGID"]])
            expect(browser.storage.local.set.mock.calls).toEqual(
                [[{"REGID": {
                    "bar": {"data": 7, "plugin": "y"},
                    "baz": {"nothing": {"here": {}}}}}]])
            expect(browser.runtime.sendMessage.mock.calls).toEqual(
                [[{"data": {"bar": {"data": 7, "plugin": "y"}, "baz": {"nothing": {"here": {}}}},
                   "message": "registryUpdated", "type": "REGID"}]])
        })
    })
})
