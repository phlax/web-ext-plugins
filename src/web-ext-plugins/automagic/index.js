
import Objectively from 'web-ext-plugins/helpers'

import logger from 'web-ext-plugins/logger'


export default class Handler {

    get _handleName () {
        return 'handle'
    }

    handle() {
        return Promise.resolve(this._handle.apply(this, arguments))
    }

    _handle(name) {
        // console.log('searching for handler')
        // console.log(name)
        // console.log(this)
        let handler = this._handleName + name.charAt(0).toUpperCase() + name.slice(1);
        if (Objectively.getAllMethodNames(this).indexOf(handler) !== -1) {
            // might need some auth control here
            logger.log(this, 'handling request: ' + name)
            return this[handler].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
}
