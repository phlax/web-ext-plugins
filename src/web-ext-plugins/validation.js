
import {Validator} from 'jsonschema';

import {NotImplementedError, ValidationError} from 'web-ext-plugins/errors'
import logger from 'web-ext-plugins/logger'
import Mutator from 'web-ext-plugins/mutator'


export default class SchemaValidator {

    constructor () {
        this.validator = new Validator()
    }

    get schema () {
        throw new NotImplementedError();
    }

    get mutator () {
        return new Mutator(this.schema)
    }

    mutate (obj) {
        return this.mutator.mutate(obj)
    }

    validate (obj) {
        const result = this.validator.validate(obj, this.schema, {disableFormat: false})
        if (result.errors.length > 0) {
            logger.err(this, 'Validation error ', result);
            return Promise.reject(new ValidationError("Failed to validate (" + this.schema.id + "): \n" + result.errors.join("\n")))
        }
        logger.log(this, 'Validation succeeded', result);
        return Promise.resolve();
    }
}
