import React from 'react';

import TabbedPreferences from './tabbed';


export default class ConfigurePreferences extends React.Component {

    constructor(props) {
        super(props);
        this.state = {preferences: []}
    }

    componentDidMount() {
        const $this = this;
        this.props.manager.preferences.get().then(result => {
            $this.setState({preferences: result});
        });
    }

    get preferencesByCategory () {
        const {preferences} = this.state;
        const prefs = {}
        for (let [k, v] of Object.entries(preferences)) {
            if (!(v.category in prefs)) {
                prefs[v.category] = {plugin: v.plugin, preferences: {}}
            }
            prefs[v.category].preferences[k] = v
        }
        return prefs
    }

    updatePrefs () {

    }

    render() {
        return (
            <div>
              <TabbedPreferences
                 preferences={this.preferencesByCategory}
                 updatePrefs={this.updatePrefs.bind(this)}
                 manager={this.props.manager} />
            </div>
        );
    }
}
