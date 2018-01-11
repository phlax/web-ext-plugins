
import ExtensibleRegistry from 'web-ext-plugins/registry/extensible';

import schema from 'web-ext-plugins/schema/services.json';


export default class PluginServices extends ExtensibleRegistry {

    get schema () {
        return schema
    }

    get types () {
        return this.manager.serviceTypes
    }

    get type () {
        return 'service'
    }
}
