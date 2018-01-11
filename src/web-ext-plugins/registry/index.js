
import logger from 'web-ext-plugins/logger'
import SchemaValidator from 'web-ext-plugins/validation'


export default class Registry extends SchemaValidator {

    constructor (manager) {
        super()
        this.manager = manager;
        logger.log(this, 'constructing registry')
        this._cached_get = false;
    }

    get () {
        return browser.storage.local.get(this.schema.id).then(result => {
            return result[this.schema.id] || {};
        });
    }

    register (obj) {
        return this.get().then(registered => {
            Object.assign(registered, this.mutate(obj))
            return this.set(registered)
        });
    }

    remove (plugin) {
        return this.get().then(objects => {
            let update = false;
            for (let [k, v] of Object.entries(objects)) {
                if ('plugin' in v && v.plugin === plugin) {
                    delete objects[k];
                    update = true;
                }
            }
            if (update) {
                return this.set(objects);
            }
        });
    }

    set (obj) {
        const newob = {};
        newob[this.schema.id] = obj;
        return this.validate(newob[this.schema.id]).then(() => {
            return browser.storage.local.set(newob).then(() => {
                logger.log(this, 'registry updated', newob)
                const request = {
                    message: 'registryUpdated',
                    type: this.schema.id,
                    data: obj}
                return browser.runtime.sendMessage(request).catch(e => {
                         logger.err(this, 'Error sending message', request)
                         throw e
                     })
            }).catch(e => {
                logger.log(this, 'Registry update failed to save', newob)
                throw e
            })
        })
    }
}
