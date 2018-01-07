
import {Validator} from 'jsonschema';
import {shallow} from 'enzyme';
import React from 'react';

import {NotImplementedError} from 'web-ext-plugins/errors';
import PluginExtension from 'web-ext-plugins/manager/extension';


test('PluginExtension constructor', () => {
    const extension = new PluginExtension('foo')
    expect(extension.manager).toBe('foo');
    expect(extension.validator instanceof Validator).toBe(true);
    expect(() => {
        extension.schema
    }).toThrow(NotImplementedError);
    expect(() => {
        extension.configComponent
    }).toThrow(NotImplementedError);
})


test('PluginExtension load', () => {
    const extension = new PluginExtension('foo')
    const assigned = {bar: 7, baz: 23}
    let _assigned = false;
    extension.assign = jest.fn((args) => {
        _assigned = {}
        Object.assign(_assigned, args)
        return assigned
    })
    extension.validate = jest.fn(() => Promise.resolve())
    return extension.load({foo: 113}).then(result => {
        expect(result).toEqual({"bar": 7, "baz": 23, "foo": 113})
        expect(_assigned).toEqual({foo: 113})
        expect(extension.validate.mock.calls).toEqual([[assigned]])
    })
})


test('PluginExtension renderComponent', () => {

    class MockComponent extends React.Component {
        render () {
            return <div>Mock config component!</div>
        }
    }

    class MockPluginExtension extends PluginExtension {

        get configComponent () {
            return MockComponent
        }
    }

    const extension = new MockPluginExtension('foo')
    const config = shallow(extension.renderConfig(113))
    expect(config.text()).toBe('Mock config component!')
})
