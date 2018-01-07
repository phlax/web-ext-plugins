
import React from 'react';

import {mount, shallow} from 'enzyme';

import ConfigurePreferences from 'web-ext-plugins/manager/config/preferences';


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
