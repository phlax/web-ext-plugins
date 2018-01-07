
import React from 'react';

import {mount, shallow} from 'enzyme';

import ConfigureTools from 'web-ext-plugins/manager/config/tools';


test('ConfigureTools render', () => {
    const manager = {tools: {get: jest.fn().mockReturnValue(Promise.resolve([1, 2, 3]))}}
    const config = shallow(<ConfigureTools manager={manager} />);
    expect(config.text()).toBe("<TabbedTools />");
})


test('ConfigureTools mount', () => {
    let toolData = {
        TOOL0: {id: 'P0', name: 'Tool 0', },
        TOOL1: {id: 'P1', name: 'Tool 1'}}
    const tools = Promise.resolve(toolData)
    const mockTool0 = {name: 'mockTool0', renderConfig: jest.fn(() => 'TOOL0 CONFIG')}
    const mockTool1 = {name: 'mockTool1', renderConfig: jest.fn(() => 'TOOL1 CONFIG')}
    const manager = {
        tools: {
            get: jest.fn(() => tools)
        },
        toolTypes: {
            TOOL0: {
                tool: mockTool0,
                name: "mockToolName",
            },
            TOOL1: {
                tool: mockTool1,
                name: "mockToolName",
            }
        }
    }
    const config = mount(<ConfigureTools manager={manager} />);
    return tools.then(() => {
        expect(config.state()).toBe(null)
        config.update();
    }).then(() => {
        expect(config.text()).toBe(
            "L10N::mockToolName::L10NL10N::mockToolName::L10NL10N::mockToolName::L10NTOOL0 CONFIG")
    });
})
