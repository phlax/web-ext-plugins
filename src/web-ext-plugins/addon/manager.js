
import logger from 'web-ext-plugins/logger'


export default class AddonPluginManager {

    constructor (plugin) {
        this.plugin = plugin;
    }

    fetch(endpoint) {
        const params = {};
        params.message = 'fetch';
        params.endpoint = endpoint;
        return this.plugin.handler.sendMessage(params);
    }

    registerPlugin() {
        const data = this.plugin.pluginData
        data.message = 'registerPlugin'
        logger.log(this, 'addon requesting registration', data)
        return this.plugin.handler.sendMessage(data);
    }
}
