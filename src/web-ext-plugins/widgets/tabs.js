
import React from 'react';

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
import './tabs.css';

//import Tabs from 'react-simpletabs';


export default class Tabbed extends React.Component {

    renderTitles () {
        return (
            <TabList>
              {this.titles.map((title, key) => {
                  return (
                      <Tab key={key}>{title}</Tab>);
              })}
            </TabList>);
    }

    get content () {
        return this.mapping.map(v => v.content)
    }

    get titles () {
        return this.mapping.map(v => v.title)
    }

    render () {
        return (
            <div>
              <Tabs>
                {this.renderTitles()}
                {this.content.map((item, key) => {
                    return (
                        <TabPanel key={key}>
                          <div className="tab-panel">
                            {item}
                          </div>
                        </TabPanel>);
                })}
              </Tabs>
            </div>
        );
    }
}
