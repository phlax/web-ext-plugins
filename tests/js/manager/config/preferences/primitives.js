
import React from 'react';

import {shallow} from 'enzyme';

import BooleanPreference from 'web-ext-plugins/manager/config/preferences/primitives/boolean';
import StringPreference from 'web-ext-plugins/manager/config/preferences/primitives/string';
import IntegerPreference from 'web-ext-plugins/manager/config/preferences/primitives/integer';


test('StringPreference render', () => {
    const preference = {}
    preference['default'] = 23
    const onBlur = jest.fn(() => 43)
    const onStringEdit = jest.fn(() => 117)
    const config = shallow(<StringPreference preference={preference} onStringEdit={onStringEdit} onBlur={onBlur}  />);
    expect(config.text()).toBe("")
    expect(config.instance().value).toBe(23)
    preference.value = 7
    expect(config.instance().value).toBe(7)
    const content = config.find('div')
    expect(content.length).toBe(1)
    const props = content.props()
    expect(props.style).toEqual({ backgroundColor: '#fafafa' })
    expect(props.contentEditable).toBe(true)
    expect(props.suppressContentEditableWarning).toBe(true)
    expect(props.placeholder).toBe('unset')
    expect(props.dangerouslySetInnerHTML).toEqual({__html: 23})
    expect(props.onMouseLeave).toBe(config.instance().onMouseLeave)
    expect(props.onMouseBlur).toBe(config.instance().onMouseBlur)
    let result = config.instance().onMouseLeave('boom')
    expect(result).toBe(117)
    expect(onStringEdit.mock.calls).toEqual([["boom"]])
    result = config.instance().onBlur('boom again')
    expect(result).toBe(43)
    expect(onBlur.mock.calls).toEqual([["boom again"]])
})


test('IntegerPreference render', () => {
    const preference = {}
    preference['default'] = 23
    const onIntegerEdit = jest.fn(() => 117)
    const config = shallow(<IntegerPreference preference={preference} onChange={onIntegerEdit} />);
    expect(config.text()).toBe("<NumericInput />")
    const content = config.find('NumericInput')
    expect(content.length).toBe(1)
    const props = content.props()
    expect(props.onChange).toBe(onIntegerEdit)
})


test('BooleanPreference render', () => {
    const preference = {}
    preference['default'] = 23
    const onBooleanEdit = jest.fn(() => 117)
    const config = shallow(<BooleanPreference preference={preference} onChange={onBooleanEdit} />);
    expect(config.text()).toBe("")
    const content = config.find('input')
    expect(content.length).toBe(1)
    const props = content.props()
    expect(props.onChange).toBe(onBooleanEdit)
})
