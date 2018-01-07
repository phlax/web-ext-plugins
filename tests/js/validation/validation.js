
import {Validator} from 'jsonschema';

import {NotImplementedError, ValidationError} from 'web-ext-plugins/errors';

import SchemaValidator from 'web-ext-plugins/manager/extension';
import logger from 'web-ext-plugins/logger';


test('SchemaValidator constructor', () => {
    const extension = new SchemaValidator()
    expect(extension.validator instanceof Validator).toBe(true);
    expect(() => {
        extension.schema
    }).toThrow(NotImplementedError);
})


test('SchemaValidator validate', () => {
    expect.assertions(5);

    class MockSchemaValidator extends SchemaValidator {

        get schema () {
            return {id: 23};
        }
    }

    const extension = new MockSchemaValidator()
    let valid = {errors: [], some: 'stuff'}
    extension.validator.validate = jest.fn(() => valid)
    logger.err = jest.fn()
    return extension.validate('xyz').then(result => {
        expect(result).toBe(undefined)
        expect(extension.validator.validate.mock.calls).toEqual(
            [["xyz", {"id": 23}, {"disableFormat": false}]])
        expect(logger.err.mock.calls).toEqual([])
        valid = {errors: ["some", "bad", "stuff"], other: 'stuff'}
        return extension.validate('xyz').catch(e => {
            expect(e instanceof ValidationError).toBe(true)
            expect(e.message).toBe('Failed to validate (23): \nsome\nbad\nstuff')
        })
    })
})
