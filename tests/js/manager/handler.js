
import RunAmock from 'web-ext-plugins/mock/amock';

import PluginHandler from 'web-ext-plugins/manager/handler';


test('PluginHandler constructor', () => {
    const handler = new PluginHandler('foo')
    expect(handler.manager).toBe('foo');
})


test('PluginHandler handler', () => {
    const amock = new RunAmock();
    const handler = new PluginHandler()
    return handler.handle({message: 'fooBar'}, 7).then(result => {
        expect(result).toBe(undefined);
        const mockHandler = jest.fn().mockReturnValue(23);
        return amock.withMockedMethod(handler, 'handleFooBar', mockHandler, () => {
            return handler.handle({message: 'fooBar'}, 7).then(result => {
                expect(result).toBe(23);
                expect(mockHandler.mock.calls).toEqual([[{message: 'fooBar'}, 7]])
            })
        })
    })
})


test('PluginHandler externalHandler', () => {
    const amock = new RunAmock();
    const handler = new PluginHandler()
    const mockHandler = jest.fn().mockReturnValue(Promise.resolve(23))
    amock.withMockedMethod(handler, 'handle', mockHandler, () => {
        const handleCb = function(resp) {
            expect(resp).toBe(23);
        }
        let result = handler.externalHandler("foo", "bar", handleCb)
        expect(result).toBe(true);
        expect(mockHandler.mock.calls[0][0]).toBe("foo")
        expect(mockHandler.mock.calls[0][1]).toBe("bar")
    })
})


test('PluginHandler uninstallHandler', () => {
    const mockDeregister = jest.fn(() => 23)
    const handler = new PluginHandler({plugins: {remove: mockDeregister}})
    const result = handler.uninstallHandler({id: "bar"})
    expect(result).toBe(23);
    expect(mockDeregister.mock.calls).toEqual([["bar"]])
})


test('PluginHandler handleRegisterPlugin', () => {
    const mockRegisterPlugin = jest.fn().mockReturnValue(23)
    const handler = new PluginHandler({plugins: {register: mockRegisterPlugin}})
    const result = handler.handleRegisterPlugin({}, "bar")
    expect(result).toBe(23);
    expect(mockRegisterPlugin.mock.calls).toEqual([[{"sender": "bar"}]])
})
