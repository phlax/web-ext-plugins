import React from 'react';

import AddAppForm from './forms/app';
import Subheading from 'web-ext-plugins/widgets/sub-heading';
import Modal from 'web-ext-plugins/widgets/modal';
import Button from 'web-ext-plugins/widgets/button';
import TabbedApps from './tabbed'


export default class ConfigureApps extends React.Component {

    constructor(props) {
        super(props);
        this.state = {apps: [], recommended: []};
    }

    renderOverlay (title, content) {
        this.modal = new Modal();
        this.modal.overlay('overlay', title, content);
        document.getElementById('config').style.minHeight = "50em";
    }

    handleAppDelete(evt) {
        evt.preventDefault();
        return this.props.manager.apps.remove({name: evt.target.name, url: evt.target.dataset.url, type: evt.target.dataset.type, plugin: evt.target.dataset.plugin}).then(this.updateComponent.bind(this));
    }

    handleAppUpdate(evt) {
        evt.preventDefault();
        this.props.manager.apps.updateApp(this.props.app);
    }

    handleInstall(evt) {
        evt.preventDefault();
        return this.props.manager.apps.install(evt.target.dataset.plugin, evt.target.dataset.type, evt.target.name, evt.target.dataset.url).then(this.updateComponent.bind(this));
    }

    updateApps() {
        return this.props.manager.apps.get().then(apps => {
            this.setState({apps: apps});
        });
    }

    updateRecommended() {
        return this.props.manager.recommended.get({inactive: true}).then(recommended => {
            const {apps} = recommended;
            this.setState({recommended: apps});
        });
    }

    updateComponent () {
        return Promise.all([
            this.updateRecommended(),
            this.updateApps()]);
    }

    componentDidMount () {
        this.updateComponent()
        browser.runtime.onMessage.addListener(this.handle.bind(this))
    }

    handle (request, sender, response) {
        const {message} = request
        if (['appAdded', 'appRemoved'].indexOf(message) !== -1) {
            return this.updateComponent().then(() => response())
        }
        return Promise.resolve()
    }

    render () {
        let {apps, recommended} = this.state;
        recommended = recommended || [];
        return (
            <TabbedApps
               handleInstall={this.handleInstall.bind(this)}
               handleAppDelete={this.handleAppDelete.bind(this)}
               manager={this.props.manager}
               apps={apps} recommended={recommended} />);
    }

    overlayAppForm (evt) {
        evt.preventDefault();
        this.renderOverlay(this.renderAddAppFormTitle(), this.renderAddAppForm());
    }

    renderAddAppButton () {
        return (
            <div>
              <Button onClick={this.overlayAppForm.bind(this)} text="appsAddAppButton" />
            </div>
        );
    }

    renderAddAppForm () {
        return (
            <div>
              <Subheading text="appsAddWebApp" />
              <AddAppForm manager={this.props.manager} />
            </div>);
    }

    renderAddAppFormTitle () {
        return (<Subheading text="appsAddAppButton" />);
    }
}
