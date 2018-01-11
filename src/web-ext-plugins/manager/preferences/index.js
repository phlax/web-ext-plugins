
import Registry from 'web-ext-plugins/registry';

import schema from 'web-ext-plugins/schema/preferences.json';


export default class PluginPreferences extends Registry {

    get schema () {
        return schema;
    }
}
