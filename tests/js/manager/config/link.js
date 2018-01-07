
import React from 'react';

import {shallow} from 'enzyme';

import ConfigLink from 'web-ext-plugins/manager/config/link';


test('ConfigLink render', () => {
    const config = shallow(<ConfigLink />);
    expect(config.text()).toBe("<Back /><Img /><Localized />")
});
