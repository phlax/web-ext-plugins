
import Mutator from 'web-ext-plugins/mutator';


test('Mutator constructor', () => {
    const mutator = new Mutator({foo: 7, properties: {bar: 23}})
    expect(mutator.schema).toEqual({"foo": 7, "properties": {"bar": 23}})
    expect(mutator.properties).toEqual({bar: 23})
})


test('Mutator mutator', () => {
    const mutator = new Mutator({foo: 7, properties: {bar: 23}})
    const mutated = mutator.getMutator('x')
    expect(mutated instanceof Mutator).toBe(true)
    expect(mutated.schema).toBe('x')
})


test('Mutator mutate string', () => {
    let schema = {
        "type": "string"}
    let mutator = new Mutator(schema)
    expect(mutator.mutate('foo')).toBe('foo')
    expect(mutator.mutate(23)).toBe('23')
    expect(mutator.mutate(true)).toBe('true')
    expect(mutator.mutate(false)).toBe('false')
    expect(mutator.mutate({})).toBe("[object Object]")
    expect(mutator.mutate([])).toBe("")
})


test('Mutator mutate integer', () => {
    let schema = {
        "type": "integer"}
    let mutator = new Mutator(schema)
    expect(mutator.mutate('foo')).toBe(NaN)
    expect(mutator.mutate(23)).toBe(23)
    expect(mutator.mutate(true)).toBe(NaN)
    expect(mutator.mutate(false)).toBe(NaN)
    expect(mutator.mutate({})).toBe(NaN)
    expect(mutator.mutate([])).toBe(NaN)
})


test('Mutator mutate number', () => {
    let schema = {
        "type": "number"}
    let mutator = new Mutator(schema)
    expect(mutator.mutate('foo')).toBe(NaN)
    expect(mutator.mutate(23)).toBe(23)
    expect(mutator.mutate(true)).toBe(NaN)
    expect(mutator.mutate(false)).toBe(NaN)
    expect(mutator.mutate({})).toBe(NaN)
    expect(mutator.mutate([])).toBe(NaN)
})


test('Mutator mutate boolean', () => {
    let schema = {
        "type": "boolean"}
    let mutator = new Mutator(schema)
    expect(mutator.mutate('foo')).toBe(true)
    expect(mutator.mutate(23)).toBe(true)
    expect(mutator.mutate(true)).toBe(true)
    expect(mutator.mutate(false)).toBe(false)
    expect(mutator.mutate({})).toBe(true)
    expect(mutator.mutate([])).toBe(true)
})


test('Mutator mutate multi', () => {
    let schema = {
        "type": ["string", "boolean"]}
    let mutator = new Mutator(schema)
    expect(mutator.mutate('foo')).toBe('foo')
    expect(mutator.mutate(23)).toBe(undefined)
    expect(mutator.mutate(true)).toBe(true)
    expect(mutator.mutate(false)).toBe(false)
    expect(mutator.mutate({})).toBe(undefined)
    expect(mutator.mutate([])).toBe(undefined)
})


test('Mutator mutate multi 2', () => {
    let schema = {
        "type": ["string", "integer"]}
    let mutator = new Mutator(schema)
    expect(mutator.mutate('foo')).toBe('foo')
    expect(mutator.mutate(23)).toBe(23)
    expect(mutator.mutate(true)).toBe(undefined)
    expect(mutator.mutate(false)).toBe(undefined)
    expect(mutator.mutate({})).toBe(undefined)
    expect(mutator.mutate([])).toBe(undefined)
})


test('Mutator mutate multi 3', () => {
    let schema = {
        "type": ["number", "boolean"]}
    let mutator = new Mutator(schema)
    expect(mutator.mutate('foo')).toBe(undefined)
    expect(mutator.mutate(23)).toBe(23)
    expect(mutator.mutate(true)).toBe(true)
    expect(mutator.mutate(false)).toBe(false)
    expect(mutator.mutate({})).toBe(undefined)
    expect(mutator.mutate([])).toBe(undefined)
})


test('Mutator mutate multi 4', () => {
    let schema = {
        "type": ["string", "object"]}
    let mutator = new Mutator(schema)
    expect(mutator.mutate('foo')).toBe('foo')
    expect(mutator.mutate(23)).toBe(undefined)
    expect(mutator.mutate(true)).toBe(undefined)
    expect(mutator.mutate(false)).toBe(undefined)
    expect(mutator.mutate({})).toEqual({})
    expect(mutator.mutate([])).toEqual({})
})


test('Mutator mutate multi 5', () => {
    let schema = {
        type: ["string", "object", "array"],
        properties: {
            bar: {
                type: 'integer'
            }
        },
        additionalProperties: {
            type: "integer"
        }
    }
    let mutator = new Mutator(schema)
    mutator.mutateProperties = jest.fn(() => {return {bar: 113, baz: 117}})
    mutator.mutateAdditionalProperties = jest.fn(() => {return {foo: 7, bar: 23}})
    expect(mutator.mutate('foo')).toBe('foo')
    expect(mutator.mutate(23)).toBe(undefined)
    expect(mutator.mutate(true)).toBe(undefined)
    expect(mutator.mutate(false)).toBe(undefined)
    expect(mutator.mutate({})).toEqual({"bar": 23, "baz": 117, "foo": 7})
    expect(mutator.mutate([])).toEqual([])
})


test('Mutator properties', () => {
    const mutator = new Mutator('foo')
    expect(mutator.properties).toBe(undefined)
})


test('Mutator constructor', () => {
    let schema = 'foo'
    let mutator = new Mutator(schema)
    expect(mutator.schema).toBe('foo')
    expect(mutator.hasAdditionalProperties()).toBe(false)
    expect(mutator.mutateProperties()).toEqual({})
    expect(mutator.mutateAdditionalProperties()).toEqual({})
    schema = {foo: 23}
    mutator = new Mutator(schema)
    const _mutate = jest.fn(() => {return {result: 117}})
    mutator.constructor = jest.fn(() => {return {mutate: _mutate}})
    expect(mutator.hasAdditionalProperties()).toBe(false)
    expect(mutator.mutateProperties({foo: {result: 23}})).toEqual({})
    expect(mutator.mutateAdditionalProperties({baz: {result: 23}})).toEqual({})

    schema.properties = {bar: 43, baz: 73}
    expect(mutator.hasAdditionalProperties()).toBe(false)
    expect(mutator.hasProperty('foo')).toBe(false)
    expect(mutator.hasProperty('bar')).toBe(true)
    expect(mutator.hasProperty('baz')).toBe(true)

    expect(mutator.mutateProperties({baz: {result: 23}})).toEqual({"baz": {"result": 117}})
    expect(_mutate.mock.calls).toEqual([[{"result": 23}]])

    expect(mutator.mutateProperties({foo: {result: 23}})).toEqual({})
    expect(mutator.mutateAdditionalProperties({baz: {result: 23}})).toEqual({})

    schema.additionalProperties = {foo: {result: 17}, bar: {result: 43}, baz: {result: 73}}
    expect(mutator.hasAdditionalProperties()).toBe(false)


    expect(mutator.hasProperty('foo')).toBe(false)
    expect(mutator.hasProperty('bar')).toBe(true)
    expect(mutator.hasProperty('baz')).toBe(true)
    schema.type = 'object'
    expect(mutator.hasAdditionalProperties()).toBe(true)
    expect(mutator.mutateProperties({baz: {result: 23}})).toEqual({"baz": {"result": 117}})

    expect(mutator.mutateProperties({foo: {result: 23}})).toEqual({})
    expect(_mutate.mock.calls[1]).toEqual([{"result": 23}])
    expect(mutator.mutateAdditionalProperties({foo: {result: 37}})).toEqual({"foo": {"result": 117}})
    expect(_mutate.mock.calls[2]).toEqual([{"result": 37}])

})


test('Mutator mutate', () => {
    let schema = 'foo'
    let mutator = new Mutator(schema)
    mutator.mutateProperties = jest.fn(() => {return {bar: 113, baz: 117}})
    mutator.mutateAdditionalProperties = jest.fn(() => {return {foo: 7, bar: 23}})
    let result = mutator.mutate({obj: 'xyz'})

    // no schema
    expect(mutator.mutateProperties.mock.calls).toEqual([])
    expect(mutator.mutateAdditionalProperties.mock.calls).toEqual([])
    expect(result).toBe(undefined)

    schema = {type: 'object'}
    mutator = new Mutator(schema)
    mutator.mutateProperties = jest.fn(() => {return {bar: 113, baz: 117}})
    mutator.mutateAdditionalProperties = jest.fn(() => {return {foo: 7, bar: 23}})
    result = mutator.mutate({obj: 'xyz'})
    expect(result).toEqual({bar: 23, baz: 117, foo: 7})
    expect(mutator.mutateProperties.mock.calls).toEqual([[{"obj": "xyz"}]])
    expect(mutator.mutateAdditionalProperties.mock.calls).toEqual([[{"obj": "xyz"}]])
})
