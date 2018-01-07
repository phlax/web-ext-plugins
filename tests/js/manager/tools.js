
import PluginTools from 'web-ext-plugins/manager/tools';
import ExtensibleRegistry from 'web-ext-plugins/registry/extensible';
import schema from 'web-ext-plugins/schema/tools.json';


test('PluginTools constructor', () => {
    const tools = new PluginTools({toolTypes: [1, 2, 3]})
    expect(tools instanceof ExtensibleRegistry).toBe(true)
    expect(tools.schema).toEqual(schema)
    expect(tools.types).toEqual([1, 2, 3])
    expect(tools.type).toBe('tool')
})
