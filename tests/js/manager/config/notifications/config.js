
import React from 'react';

import {mount, shallow} from 'enzyme';

import ConfigureNotifications from 'web-ext-plugins/manager/config/notifications';


test('ConfigureNotifications render', () => {
    const manager = {notifications: {get: jest.fn().mockReturnValue(Promise.resolve([1, 2, 3]))}}
    const config = shallow(<ConfigureNotifications manager={manager} />);
    expect(config.text()).toBe("<TabbedNotifications />");
})


test('ConfigureNotifications mount', () => {
    let notificationData = {
        notification0: {id: 'P0', name: 'NOTIFICATION0', category: "CATEGORY1"},
        notification1: {id: 'P1', name: 'NOTIFICATION1', category: "CATEGORY2"}}
    const notifications = Promise.resolve(notificationData)
    const manager = {
        notifications: {
            get: jest.fn(() => notifications)
        }
    }
    const config = mount(<ConfigureNotifications manager={manager} />);
    return notifications.then(() => {
        expect(config.state().notifications).toBe(notificationData)
        config.update();
    }).then(() => {
        expect(config.text()).toBe(
            "L10N::CATEGORY1::L10NL10N::CATEGORY2::L10NL10N::CATEGORY1::L10NL10N::NOTIFICATION0::L10N")
    });
})
