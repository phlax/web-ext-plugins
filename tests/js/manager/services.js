
import PluginServices from 'web-ext-plugins/manager/services';
import ExtensibleRegistry from 'web-ext-plugins/registry/extensible';
import schema from 'web-ext-plugins/schema/services.json';


test('PluginServices constructor', () => {
    const services = new PluginServices({serviceTypes: [1, 2, 3]})
    expect(services instanceof ExtensibleRegistry).toBe(true)
    expect(services.schema).toEqual(schema)
    expect(services.types).toEqual([1, 2, 3])
    expect(services.type).toBe('service')

})
