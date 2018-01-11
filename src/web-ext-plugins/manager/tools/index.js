
import ExtensibleRegistry from 'web-ext-plugins/registry/extensible';
import schema from 'web-ext-plugins/schema/tools.json';


export default class PluginTools extends ExtensibleRegistry {

    get schema () {
        return schema
    }

    get types () {
        return this.manager.toolTypes
    }

    get type () {
        return 'tool'
    }
}
