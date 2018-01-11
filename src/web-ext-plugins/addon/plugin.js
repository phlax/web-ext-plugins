
import {NotImplementedError} from 'web-ext-plugins/errors';

import AddonPluginManager from './manager'
import AddonPluginHandler from './handler'
import logger from 'web-ext-plugins/logger'


export default class AddonPlugin {

    constructor () {
        logger.log(this, 'setting up addon: ')
        this.manager = new this.managerClass(this)
        this.handler = new this.handlerClass(this)
        this.icon = '';
        this.description = '';
        this.name = '';
    }

    get handlerClass () {
        return AddonPluginHandler
    }

    get managerClass () {
        return AddonPluginManager
    }

    get managerId () {
        throw new NotImplementedError();
    }

    get pluginIcon() {
        return browser.extension.getURL(this.icon);
    }

    get pluginData () {
        return {
            name: this.pluginName,
            icon: this.pluginIcon,
            description: this.pluginDescription,
            longDescription: this.longDescription,
            apps: this.apps,
            tools: this.tools,
            notifications: this.notifications,
            preferences: this.preferences,
            services: this.services,
            recommended: this.recommended,
            provides: this.provides}
    }

    get pluginDescription() {
        if (this.description) {
            return this.description;
        } else {
            return browser.runtime.getManifest().description;
        }
    }

    get pluginName() {
        if (this.name) {
            return this.name;
        } else {
            return browser.runtime.getManifest().name;
        }
    }

    setup() {
        this.handler.addListeners();
        return this.manager.registerPlugin()
    }
}
