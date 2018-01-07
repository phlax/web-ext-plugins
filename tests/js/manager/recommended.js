
import RecommendedRegistry from 'web-ext-plugins/manager/recommended';


test('RecommendedRegistry constructor', () => {
    const manager = {appTypes: {}}
    const recommended = new RecommendedRegistry(manager)
    // expect(recommended.registryId).toBe('recommended');
    let _recommended = {}

    recommended.validate = jest.fn(() => Promise.resolve())
    return recommended.register(_recommended).then(() => {
        expect(browser.storage.local.get.mock.calls).toEqual([])
        expect(browser.storage.local.set.mock.calls).toEqual([])

        // only accept recommendations for apps...
        _recommended = {
            foo: [{name: 'FOO'}],
            plugin: 'PLUGINFOO',
            bar: [{name: 'BAR'}]}
        return recommended.register(_recommended).then(() => {
            expect(browser.storage.local.get.mock.calls).toEqual([])
            expect(browser.storage.local.set.mock.calls).toEqual([])

            // only accept recommendations for recognized app types...
            _recommended = {apps: _recommended}
            return recommended.register(_recommended).then(() => {
                expect(browser.storage.local.get.mock.calls).toEqual([["recommended"], ["recommended"]])
                expect(browser.storage.local.set.mock.calls).toEqual([])

                // update!
                manager.appTypes = {foo: {apps: {}}}
                return recommended.register(_recommended).then(() => {
                    // expect(browser.storage.local.get.mock.calls).toEqual([['recommended']])
                    let expected = {
                        "recommended": {"apps": {"foo": [{"name": "FOO", "plugin": "PLUGINFOO"}]}}}
                    expect(browser.storage.local.set.mock.calls).toEqual([[expected]])

                    // update with a different recommendation type
                    manager.appTypes.bar = {}
                    delete _recommended.apps['foo']
                    _recommended.apps.plugin = "PLUGINBAZ"
                    browser.storage.local.get = jest.fn(() => Promise.resolve(expected))
                    return recommended.register(_recommended).then(() => {

                        expected = {
                            "recommended": {
                                "apps": {
                                    "bar": [{"name": "BAR", "plugin": "PLUGINBAZ"}],
                                    "foo": [{"name": "FOO", "plugin": "PLUGINFOO"}]}}}
                        expect(browser.storage.local.set.mock.calls[1]).toEqual([expected])

                        // update adding to an existing recommendation type
                        _recommended = {
                            apps: {
                                foo: [{name: 'FOO2'}],
                                plugin: 'PLUGINBAR'}}
                        browser.storage.local.get = jest.fn(() => Promise.resolve(expected))
                        return recommended.register(_recommended).then(() => {
                            expected = {
                                "recommended": {
                                    "apps": {
                                        "bar": [{"name": "BAR", "plugin": "PLUGINBAZ"}],
                                        "foo": [
                                            {"name": "FOO", "plugin": "PLUGINFOO"},
                                            {"name": "FOO2", "plugin": "PLUGINBAR"}]}}}
                            expect(browser.storage.local.set.mock.calls[2]).toEqual([expected])
                        })
                    })
                })
            })
        })
    })
})
