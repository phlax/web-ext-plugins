
import PreferencesRegistry from 'web-ext-plugins/manager/preferences';


test('PreferencesRegistry constructor', () => {
    const preferences = new PreferencesRegistry()
    let prefs = {}
    preferences.validate = jest.fn(() => Promise.resolve())
    preferences.mutate = jest.fn((foo) => foo)
    return preferences.register(prefs).then(() => {
        expect(browser.storage.local.get.mock.calls).toEqual([["preferences"]])
        expect(browser.storage.local.set.mock.calls[0]).toEqual([{preferences: {}}])
        prefs = {foo: 7, bar: 23}
        return preferences.register(prefs).then(() => {
            expect(browser.storage.local.set.mock.calls[1]).toEqual([{"preferences": prefs}])
            browser.storage.local.get = jest.fn(() => Promise.resolve({"preferences": prefs}))
            let newPrefs = {baz: {foo0: 'a', foo1: 'b'}}
            return preferences.register(newPrefs).then(() => {
                newPrefs.foo = prefs.foo
                newPrefs.bar = prefs.bar
                expect(browser.storage.local.set.mock.calls[2]).toEqual([{"preferences": newPrefs}])
            })
        })
    })
})
