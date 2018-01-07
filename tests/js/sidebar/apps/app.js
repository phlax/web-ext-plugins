
import React from 'react';

import {shallow} from 'enzyme';

import SidebarApp from 'web-ext-plugins/sidebar/apps/app'


class MockSidebarAppComponent extends React.Component {

    render () {
        return <div>MOCKCOMPONENT</div>
    }
}


test('SidebarApp render', () => {
    const manager = {appTypes: {BARTYPE: {sidebar: MockSidebarAppComponent}}}
    const app = {plugin: {icon: 'FOOICON'}, type: 'BARTYPE'}
    const config = shallow(<SidebarApp manager={manager} app={app} />);
    expect(config.text()).toBe("><MockSidebarAppComponent />")
})
