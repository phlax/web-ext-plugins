
import React from 'react';

import {mount, shallow} from 'enzyme';

import ConfigureServices from 'web-ext-plugins/manager/config/services';


test('ConfigureServices render', () => {
    const manager = {services: {get: jest.fn().mockReturnValue(Promise.resolve([1, 2, 3]))}}
    const config = shallow(<ConfigureServices manager={manager} />);
    expect(config.text()).toBe("<TabbedServices />")
})


test('ConfigureServices mount', () => {
    let serviceData = {
        SERVICE0: {
                service0a: {
                    name: "services0a",
                    targetLanguage: ['a', 'b', 'c']},
                service0b: {
                    name: "services0b",
                    targetLanguage: ['a', 'b', 'c']}},
        SERVICE1: {
                service1a: {
                    name: "services1a",
                    targetLanguage: ['a', 'b', 'c']},
                service1b: {
                    name: "services1b",
                    targetLanguage: ['a', 'b', 'c']}}}
    const services = Promise.resolve(serviceData)
    const mockService0 = {name: 'mockService0', renderConfig: jest.fn(() => 'SERVICE0 CONFIG')}
    const mockService1 = {name: 'mockService1', renderConfig: jest.fn(() => 'SERVICE1 CONFIG')}
    const manager = {
        services: {
            get: jest.fn(() => services)
        },
        serviceTypes: {
            SERVICE0: {
                service: mockService0,
                name: "mockServiceName0",
            },
            SERVICE1: {
                service: mockService1,
                name: "mockServiceName1",
            }
        }
    }
    const config = mount(<ConfigureServices manager={manager} />);
    return services.then(() => {
        expect(config.state()).toBe(null)
        config.update();
    }).then(() => {
        expect(config.text()).toBe(
            "L10N::mockServiceName0::L10NL10N::mockServiceName1::L10NL10N::mockServiceName0::L10NSERVICE0 CONFIG")
    });
})
