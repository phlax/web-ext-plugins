
import Mutator from 'web-ext-plugins/mutator';


test('Mutator constructor', () => {
    let schema = 'foo'
    let mutator = new Mutator(schema)
    expect(mutator.schema).toBe('foo')
    expect(mutator.hasProperties()).toBe(false)
    expect(mutator.hasAdditionalProperties()).toBe(false)
    expect(mutator.getProperties()).toEqual({})
    expect(mutator.getAdditionalProperties()).toEqual({})
    schema = {foo: 23}
    mutator = new Mutator(schema)
    const _mutate = jest.fn(() => {return {result: 117}})
    mutator.constructor = jest.fn(() => {return {mutate: _mutate}})
    expect(mutator.hasProperties()).toBe(false)
    expect(mutator.hasAdditionalProperties()).toBe(false)
    expect(mutator.getProperties({foo: {result: 23}})).toEqual({})
    expect(mutator.getAdditionalProperties({baz: {result: 23}})).toEqual({})

    schema.properties = {bar: 43, baz: 73}
    expect(mutator.hasProperties()).toBe(true)
    expect(mutator.hasAdditionalProperties()).toBe(false)
    expect(mutator.hasProperty('foo')).toBe(false)
    expect(mutator.hasProperty('bar')).toBe(true)
    expect(mutator.hasProperty('baz')).toBe(true)
    expect(mutator.getProperties({baz: {result: 23}})).toEqual({"baz": {"result": 23}})
    expect(mutator.getProperties({foo: {result: 23}})).toEqual({})
    expect(mutator.getAdditionalProperties({baz: {result: 23}})).toEqual({})

    schema.additionalProperties = {foo: {result: 17}, bar: {result: 43}, baz: {result: 73}}
    expect(mutator.hasProperties()).toBe(true)
    expect(mutator.hasAdditionalProperties()).toBe(false)
    expect(mutator.hasProperty('foo')).toBe(false)
    expect(mutator.hasProperty('bar')).toBe(true)
    expect(mutator.hasProperty('baz')).toBe(true)
    schema.type = 'object'
    expect(mutator.hasAdditionalProperties()).toBe(true)
    expect(mutator.getProperties({baz: {result: 23}})).toEqual({"baz": {"result": 23}})
    expect(mutator.getProperties({foo: {result: 23}})).toEqual({})
    // this recurses
    expect(mutator.getAdditionalProperties({foo: {result: 37}})).toEqual({"foo": {"result": 117}})
    expect(_mutate.mock.calls).toEqual([[{ result: 37}]])
})


test('Mutator mutate', () => {
    let schema = 'foo'
    let mutator = new Mutator(schema)
    mutator.getProperties = jest.fn(() => {return {bar: 113, baz: 117}})
    mutator.getAdditionalProperties = jest.fn(() => {return {foo: 7, bar: 23}})
    const result = mutator.mutate({obj: 'xyz'})
    expect(result).toEqual({bar: 23, baz: 117, foo: 7})
    expect(mutator.getProperties.mock.calls).toEqual([[{"obj": "xyz"}]])
    expect(mutator.getAdditionalProperties.mock.calls).toEqual([[{"obj": "xyz"}]])
})
