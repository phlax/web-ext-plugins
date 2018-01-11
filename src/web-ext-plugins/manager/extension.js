
import React from 'react';

import {NotImplementedError} from 'web-ext-plugins/errors'
import SchemaValidator from 'web-ext-plugins/validation'


export default class PluginExtension extends SchemaValidator {

    constructor (manager) {
        super()
        this.manager = manager;
    }

    get configComponent () {
        throw new NotImplementedError();
    }

    assign (obj) {
        return this.mutate(obj)
    }

    load(obj) {
        const mutated = this.assign(obj);
        return this.validate(mutated).then(() => {
            Object.assign(obj, mutated)
            return obj;
        });
    }

    renderConfig (type) {
        const ConfigComponent = this.configComponent;
        return (
            <ConfigComponent
               extension={this}
               type={type} />);
    }
}
