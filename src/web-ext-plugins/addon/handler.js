
import ExternalRequestsHandler from 'web-ext-plugins/automagic/request'

import logger from 'web-ext-plugins/logger'


export default class AddonPluginHandler extends ExternalRequestsHandler {

    constructor (plugin) {
        super()
        this.plugin = plugin;
    }

    sendMessage(request) {
        logger.log(this, "Addon sending request", request)
        return browser.runtime.sendMessage(
            this.plugin.managerId,
            request).catch(e => {
                logger.err(this, 'Error sending request to manager', request)
                throw e
            });
    }

    handleLocalize(request) {
        return {text: browser.i18n.getMessage(request.text), original: request.text}
    }

    handleResolveURL(request) {
        return {url: browser.extension.getURL(request.url), original: request.url}
    }
}
