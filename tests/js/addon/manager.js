
import AddonPluginManager from 'web-ext-plugins/addon/manager';


test('AddonPluginManager constructor', () => {
    const manager = new AddonPluginManager('foo')
    expect(manager.plugin).toBe('foo');
})


test('AddonPluginManager registerPlugin', () => {
    const mockPlugin = {
        handler: {sendMessage: jest.fn().mockReturnValue(23)},
        pluginData: {
            pluginDescription: 'DESCRIPTION',
            longDescription: 'LONGDESCRIPTION',
            pluginName: 'NAME',
            pluginIcon: 'ICON',
            tools: [1, 2, 3],
            provides: [4, 5, 6]}}
    const manager = new AddonPluginManager(mockPlugin)
    manager.registerPlugin()
    const expected = {message: "registerPlugin"}
    Object.assign(expected, mockPlugin.pluginData)
    expect(mockPlugin.handler.sendMessage.mock.calls[0][0]).toEqual(expected)
})
