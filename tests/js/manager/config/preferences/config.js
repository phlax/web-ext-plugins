
import React from 'react';

import {mount, shallow} from 'enzyme';

import ConfigurePreferences from 'web-ext-plugins/manager/config/preferences';
import PreferencesTable from 'web-ext-plugins/manager/config/preferences/table';


test('ConfigurePreferences render', () => {
    const manager = {preferences: {get: jest.fn().mockReturnValue(Promise.resolve([1, 2, 3]))}}
    const config = shallow(<ConfigurePreferences manager={manager} />);
    expect(config.text()).toBe("<TabbedPreferences />")
})


test('ConfigurePreferences mount', () => {
    let preferenceData = {
        preference0: {id: 'P0', name: 'PREFERENCE0', category: "CATEGORY1"},
        preference1: {id: 'P1', name: 'PREFERENCE1', category: "CATEGORY2"}}
    const preferences = Promise.resolve(preferenceData)
    const manager = {
        preferences: {
            get: jest.fn(() => preferences)
        }
    }
    const config = mount(<ConfigurePreferences manager={manager} />);
    return preferences.then(() => {
        expect(config.state().preferences).toBe(preferenceData)
        config.update();
    }).then(() => {
        expect(config.text()).toBe(
            "L10N::CATEGORY1::L10NL10N::CATEGORY2::L10NL10N::CATEGORY1::L10NtableHeaderNametableHeaderTypetableHeaderValuetableHeaderPlugin                    PreviousPage  of 15 rows10 rows20 rows25 rows50 rows100 rowsNextNo rows foundLoading..."
)
    });
})


test('PreferencesTable render', () => {
    const config = shallow(<PreferencesTable preferences={{}} />);
    expect(config.text()).toBe("<Subheading /><Table />")
})


test('PreferencesTable render string', () => {
    const config = shallow(<PreferencesTable preferences={{}} />);
    const getCellType = jest.fn(() => 'string')
    const instance = config.instance()
    instance.getCellType = getCellType
    const cell = {original: [7, 23]}
    let component = config.instance().renderValue(cell)
    expect(getCellType.mock.calls).toEqual([[{"original": [7, 23]}]])
    expect(component.props.preference).toBe(23)
    const onPreferenceChange = jest.fn(() => 17)
    instance.onPreferenceChange = onPreferenceChange
    expect(component.props.onStringEdit({target: {innerHTML: 'BOOM'}})).toBe(17)
    expect(onPreferenceChange.mock.calls).toEqual([[{"original": [7, 23]}, "BOOM"]])
    expect(component.props.onBlur).toBe(instance.onStringBlur)

})


test('PreferencesTable render boolean', () => {
    const config = shallow(<PreferencesTable preferences={{}} />);
    const getCellType = jest.fn(() => 'boolean')
    const instance = config.instance()
    instance.getCellType = getCellType
    const cell = {original: [7, 23]}
    let component = config.instance().renderValue(cell)
    expect(getCellType.mock.calls).toEqual([[{"original": [7, 23]}]])
    expect(component.props.preference).toBe(23)
    const onPreferenceChange = jest.fn(() => 17)
    instance.onPreferenceChange = onPreferenceChange
    expect(component.props.onChange({target: {checked: true}})).toBe(17)
    expect(onPreferenceChange.mock.calls).toEqual([[{"original": [7, 23]}, true]])
})


test('PreferencesTable render integer', () => {
    const config = shallow(<PreferencesTable preferences={{}} />);
    const getCellType = jest.fn(() => 'integer')
    const instance = config.instance()
    instance.getCellType = getCellType
    const cell = {original: [7, 23]}
    let component = config.instance().renderValue(cell)
    expect(getCellType.mock.calls).toEqual([[{"original": [7, 23]}]])
    expect(component.props.preference).toBe(23)
    const onPreferenceChange = jest.fn(() => 17)
    instance.onPreferenceChange = onPreferenceChange
    expect(component.props.onChange(777)).toBe(17)
    expect(onPreferenceChange.mock.calls).toEqual([[{"original": [7, 23]}, 777]])
})


test('PreferencesTable render onPreferenceChange', () => {
    const updatePrefs = jest.fn(() => Promise.resolve(23))
    const manager = {preferences: {update: updatePrefs}}
    const config = shallow(<PreferencesTable manager={manager} preferences={{}} />);
    const instance = config.instance()
    instance.setState = jest.fn()
    const info = {index: 2, column: {id: 1}, original: ['bar', {plugin: 'fooplugin', category: 'foocategory'}]}
    instance.state = {data: [[], [], [[], [[], []]]]}
    instance.onPreferenceChange(info, 'foo').then(() => {
        expect(updatePrefs.mock.calls).toEqual([['bar', 'fooplugin', 'foocategory', 'foo']])
        expect(instance.setState.mock.calls).toEqual([[{"data": [[], [], [[], [[], "foo"]]]}]])
    })
})


test('PreferencesTable render onBlur', () => {
    const config = shallow(<PreferencesTable preferences={{}} />);
    const instance = config.instance()
    instance.setState = jest.fn()
    instance.state = {data: [[], [], [[], [[], []]]]}
    const info = {index: 2, column: {id: 1}, original: ['bar', {plugin: 'fooplugin', category: 'foocategory'}]}
    const evt = {target: {innerHTML: 'X'}}
    instance.onStringBlur(evt, info)
    expect(instance.setState.mock.calls).toEqual([[{"data": [[], [], [[], [[], "X"]]]}]])
})
