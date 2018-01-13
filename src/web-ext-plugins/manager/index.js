
import PluginRegistry from './plugins'
import PluginDelegate from './delegate'
import PluginUpdater from './updater'
import PluginApps from './apps'
import PluginHandler from './handler'
import PluginNotifications from './notifications'
import PluginPreferences from './preferences'
import PluginServices from './services'
import PluginTools from './tools'
import PluginRecommended from './recommended'
import configMenuItems from 'web-ext-plugins/manager/config/menu/items'
import sidebarItems from 'web-ext-plugins/sidebar/items'
import logger from 'web-ext-plugins/logger'


export default class PluginManager {

    constructor() {
        logger.log(this, 'setting up manager')
        this.plugins = new this.registryClass(this);
        this.delegate = new this.delegateClass(this);
        this.updater = new this.updaterClass(this);
        this.apps = new this.appsClass(this);
        this.preferences = new this.preferencesClass(this)
        this.services = new this.servicesClass(this)
        this.recommended = new this.recommendedClass(this)
        this.tools = new this.toolsClass(this)
        this.notifications = new this.notificationsClass(this);
        this.handler = new this.handlerClass(this);
        logger.log(this, 'manager constructed')
    }

    get appsClass() {
        return PluginApps;
    }

    get appTypes () {
        return {};
    }

    get serviceTypes () {
        return {};
    }

    get toolTypes () {
        return {};
    }

    get systemNotifications () {
        return {
            pluginRegistered: {
                category: 'notificationsSystem',
                name: "notifyPluginRegistered",
                default: true},
            pluginRemoved: {
                category: 'notificationsSystem',
                name: "notifyPluginRemoved",
                default: true},
            appAdded: {
                category: 'notificationsSystem',
                name: "notifyAppAdded",
                default: true},
            appRemoved: {
                category: 'notificationsSystem',
                name: "notifyAppRemoved",
                default: true},
        }
    }

    get configMenuItems () {
        return configMenuItems;
    }

    get delegateClass() {
        return PluginDelegate;
    }

    get handlerClass() {
        return PluginHandler;
    }

    get notificationsClass() {
        return PluginNotifications;
    }

    get preferencesClass() {
        return PluginPreferences;
    }

    get recommendedClass() {
        return PluginRecommended;
    }

    get registries () {
        return [
            this.notifications,
            this.preferences,
            this.recommended,
            this.services,
            this.tools]
    }

    get registryClass() {
        return PluginRegistry;
    }

    get servicesClass() {
        return PluginServices;
    }

    get sidebarItems () {
        return sidebarItems;
    }

    get toolsClass() {
        return PluginTools;
    }

    get updaterClass() {
        return PluginUpdater;
    }

    setup() {
        this.handler.addListeners();
        this.notifications.register(this.systemNotifications)
    }
}
