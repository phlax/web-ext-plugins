
import Registry from 'web-ext-plugins/registry'

import schema from 'web-ext-plugins/schema/apps.json';


export default class PluginApps extends Registry {

    constructor(manager) {
        super(manager)
        this.manager = manager;
    }

    get schema () {
        return schema
    }

    get(args) {
        if (!args || (args.join && args.join.indexOf('plugin') !== -1)) {
            return this._addAppPlugins(args);
        }
        return super.get(args).then(this._mangleToArray)
    }

    install (plugin, type, name, url) {
        return this.get({join: false}).then(apps => {
            const app = {plugin, url, type, name, updated: Date.now()};
            apps.push(app)
            return this.save(apps, app, 'appAdded')
        })
    }

    register (obj) {
        return this.get({join: false}).then(registered => {
            registered = registered.concat(obj);
            return this.set(registered)
        });
    }

    remove(app) {
        return this.get({join: false}).then(apps => {
            const newapps = apps.filter(_app => !(
                _app.type === app.type
                    && _app.plugin === app.plugin
                    && _app.url === app.url
                    && _app.name === app.name))
            if (newapps.length !== apps.length) {
                return this.save(newapps, app, 'appRemoved');
            }
            return Promise.resolve()
        })
    }

    save(apps, app, reason) {
        return this.set(apps).then(() => {
            return this._notifyAppChange(app, reason, app.name).then(() => apps)
        })
    }

    saveApp(app) {
        return browser.storage.local.get('apps').then(result => {
            let {apps} = result;
            const newapps = [];
            apps = apps || [];
            for (let a in apps) {
                if (apps[a].type === app.type && apps[a].url === app.url && apps[a].name === app.name) {
                    app.updated = Date.now();
                    newapps.push(app);
                } else {
                    newapps.push(apps[a]);
                }
            }
            return this.set(apps)
        })
    }

    updateApp(app) {
        const $this = this;
        return this.get().then(apps => {
            let promises = [];
            const updated = [];
            for (let a in apps) {
                if (apps[a].plugin == apps[a].plugin && apps[a].type === app.type && apps[a].url === app.url && apps[a].name === app.name) {
                    updated.push(apps[a]);
                    promises.push(
                        browser.runtime.sendMessage(
                            apps[a].type,
                            {message: 'updateApp',
                             app: {plugin: app.plugin, name: app.name, url: app.url, type: app.type}}))
                }
            }
            return Promise.all(promises).then((results) => {
                const morepromises = []
                for (let r in results) {
                    let toupdate = updated[r];
                    toupdate.projects = results[r];
                    morepromises.push($this.saveApp(toupdate))
                }
                return Promise.all(morepromises).then(() => {
                    return browser.runtime.sendMessage({
                        message: 'appUpdated',
                        app: app,
                    });
                })
            })
        })
    }

    _addAppPlugins(args) {
        return super.get(args).then(apps => {
            return this.manager.plugins.get().then(plugins => {
                for (let app in apps) {
                    apps[app].plugin = plugins[apps[app].plugin];
                }
                return this._mangleToArray(apps);
            })
        })
    }

    _mangleToArray(apps) {
        if (Array.from(apps).length > 0) {
            return apps
        }
        return [];
    }


    _notifyAppChange(app, change, message) {
        return browser.runtime.sendMessage({
            message: change,
            data: app}).then(() => {
                this.manager.notifications.notify(
                    change,
                    {message})
                return Promise.resolve()
            })
    }

    updateAllData() {
        return this.manager.updater.updateApps();
    }

}
