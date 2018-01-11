
import Handler from 'web-ext-plugins/automagic'

import logger from 'web-ext-plugins/logger'


export default class ExternalRequestsHandler extends Handler {

    addListeners() {
        logger.log(this, 'adding external request listeners')
        browser.runtime.onMessageExternal.addListener(this.externalHandler.bind(this))
    }

    handle(request, sender) {
        if (request.message) {
            return super.handle(request.message, request, sender)
        }
        return Promise.resolve()
    }

    externalHandler(request, sender, sendResponse) {
        logger.log(this, 'external message received', request)
        this.handle(request, sender).then(resp => {
            logger.log(this, 'external message handled, sending response', resp)
            sendResponse(resp)
        }).catch(e => {
            logger.err(this, 'Error handling external request', request)
            throw e
        });
        return true;
    }
}
