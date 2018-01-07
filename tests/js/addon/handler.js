
import AddonPluginHandler from 'web-ext-plugins/addon/handler';


test('AddonPluginHandler constructor', () => {
    const handler = new AddonPluginHandler('foo')
    expect(handler.plugin).toBe('foo');
})
