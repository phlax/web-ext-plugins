
import {NotImplementedError} from 'web-ext-plugins/errors'
import Registry from 'web-ext-plugins/registry';
import Mutator from 'web-ext-plugins/mutator';
import ExtensibleRegistry from 'web-ext-plugins/registry/extensible';


test('ExtensibleRegistry constructor', () => {
    const manager = {}
    const registry = new ExtensibleRegistry(manager)
    expect(registry instanceof Registry).toBe(true)
    expect(() => {
        registry.type
    }).toThrow(NotImplementedError);
    expect(() => {
        registry.types
    }).toThrow(NotImplementedError);
})


test('ExtensibleRegistry mutator', () => {
    class MockExtensibleRegistry extends ExtensibleRegistry {

        get schema () {
            return {additionalProperties: 'foo'}
        }
    }
    const extensibles = new MockExtensibleRegistry({})
    expect(extensibles.mutator instanceof Mutator).toBe(true)
    expect(extensibles.mutator.schema).toBe('foo')
})


test('ExtensibleRegistry assign', () => {
    const mutator = {mutate: jest.fn(() => {return {result: {number: 23}}})}

    class MockExtensibleRegistry extends ExtensibleRegistry {

        get mutator () {
            return mutator
        }
    }
    const extensibles = new MockExtensibleRegistry({})
    const result = extensibles.assign({plugin: 7})
    expect(result).toEqual({"result": {"number": 23, "plugin": 7}})
    expect(mutator.mutate.mock.calls).toEqual([[{}]])
})


test('ExtensibleRegistry getExtension', () => {
    const types = {foo: {}}
    class MockExtensibleRegistry extends ExtensibleRegistry {

        get type () {
            return 'bar'
        }

        get types () {
            return types
        }
    }
    const extensibles = new MockExtensibleRegistry({})
    let result = extensibles.getExtension('foo')
    expect(result).toBe(undefined)
    types.foo = {bar: 23}
    result = extensibles.getExtension('foo')
    expect(result).toBe(23)
})



test('ExtensibleRegistry loadExtension', () => {
    const extensibles = new ExtensibleRegistry({})
    const _load = jest.fn(() => 23)
    extensibles.getExtension = jest.fn(() => {return {load: _load}})
    let result = extensibles.loadExtension('foo', {foo: 23})
    expect(result).toBe(23)
    expect(extensibles.getExtension.mock.calls).toEqual([[ 'foo' ]])
    expect(_load.mock.calls).toEqual([[{ foo: 23 }]])
})


test('ExtensibleRegistry assignExtension', () => {
    const update = {}
    const extensibles = new ExtensibleRegistry({})
    extensibles.loadExtension = jest.fn(() => Promise.resolve({}))
    return extensibles.assignExtension('foo', {foo: 23}, update).then(() => {
        expect(extensibles.loadExtension.mock.calls).toEqual([['foo', { foo: 23 }]])
        expect(update).toEqual({})

        extensibles.loadExtension = jest.fn(() => Promise.resolve({bar: {value: 7}, baz: {value: 113}}))
        return extensibles.assignExtension('foo', {foo: 23}, update).then(() => {
            expect(extensibles.loadExtension.mock.calls).toEqual([['foo', { foo: 23 }]])
            expect(update).toEqual({})

            extensibles.loadExtension = jest.fn(() => Promise.resolve({bar: {value: 7}, baz: {value: 113}}))
            Object.assign(update, {foo: {value: 7}, bar: {value: 17}})
            return extensibles.assignExtension('foo', {foo: 23}, update).then(() => {
                expect(extensibles.loadExtension.mock.calls).toEqual([['foo', { foo: 23 }]])
                expect(update).toEqual({ foo: {value: 7}, bar: {value: 7}})
            })
        })
    })
})

test('ExtensibleRegistry assignExtensionTypes', () => {
    const types = {}

    class MockExtensibleRegistry extends ExtensibleRegistry {

        get types () {
            return types
        }
    }
    const extensibles = new MockExtensibleRegistry({})
    extensibles.assignExtension = jest.fn(() => Promise.resolve(23))
    extensibles.assign = jest.fn(() => {return {baz: 43}})
    const update = {}
    const obj = {}
    return Promise.all(extensibles.assignExtensionTypes(obj, update)).then(results => {
        expect(results).toEqual([])
        expect(update).toEqual({})
        obj.foo = {bar: 113}
        return Promise.all(extensibles.assignExtensionTypes(obj, update)).then(results => {
            expect(results).toEqual([])
            expect(update).toEqual({})
            expect(extensibles.assignExtension.mock.calls).toEqual([])
            types.foo = {}
            return Promise.all(extensibles.assignExtensionTypes(obj, update)).then(results => {
                expect(results).toEqual([23])
                expect(update).toEqual({foo:{baz: 43}})
                expect(extensibles.assignExtension.mock.calls).toEqual(
                    [['foo', { bar: 113 }, { baz: 43 }]])
            })
        })
    })
})


test('ExtensibleRegistry register', () => {
    const extensibles = new ExtensibleRegistry({})
    extensibles.set = jest.fn(() => Promise.resolve(23))
    let _extensibles = {}

    const assign1 = jest.fn((update) => {
        update['one'] = 1
        return Promise.resolve()
    })

    const assign2 = jest.fn((update) => {
        update['two'] = 2
        return Promise.resolve()
    })

    extensibles.assignExtensionTypes = jest.fn((obj, update) => {
        return [assign1(update), assign2(update)]
    })
    extensibles.get = jest.fn(() => {
        return Promise.resolve({foo: 23, bar: 7})
    })
    extensibles.set = jest.fn(() => Promise.resolve(23))
    return extensibles.register(_extensibles).then(result => {
        expect(result).toBe(23)
        expect(extensibles.set.mock.calls).toEqual(
            [[{foo: 23, bar: 7, one: 1, two: 2}]])
    })
})
