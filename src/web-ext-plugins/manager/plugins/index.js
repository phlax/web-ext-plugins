
import Registry from 'web-ext-plugins/registry'

import logger from 'web-ext-plugins/logger'

import schema from 'web-ext-plugins/schema/plugins.json';


export default class PluginRegistry extends Registry {

    get schema () {
        return schema
    }

    register(request) {
        if (!(request && Object.keys(request).length > 0)) {
            return Promise.resolve()
        }
        const mutated = this.mutate({plugins: request}).plugins
        return this.get().then(plugins => {
            const {sender} = request;
            plugins[sender.id] = mutated
            plugins[sender.id].id = request.sender.id;
            plugins[sender.id].description = mutated.description || "";
            plugins[sender.id].longDescription = mutated.longDescription || "";
            logger.log(this, 'registering plugin: ' + sender.id);
            return this.set(plugins).then(() => {
                request.id = sender.id;
                return this.updateRegistries(request).then(() => {
                    return browser.runtime.sendMessage({message: 'pluginRegistered', plugin: plugins[sender.id]}).then(() => {
                        return this.manager.notifications.notify('pluginRegistered', {message: plugins[sender.id].name}).then(() => {
                            return {response: 'added: ' + sender.id, plugins: plugins};
                        })
                    });
                });
            });
        });
    }

    remove(plugin) {
        const $this = this;
        return this.get().then(plugins => {
            if (Object.keys(plugins).indexOf(plugin) !== -1) {
                const pluginName = plugins[plugin].name;
                delete plugins[plugin];
                return $this.set(plugins).then(() => {
                    return $this.removeRegistries(plugin).then(() => {
                        return browser.runtime.sendMessage({message: 'pluginRemoved', pluginName}).then(() => {
                            $this.manager.notifications.notify('pluginRemoved', {message: pluginName});
                        })
                    })
                })
            }
        })
    }

    getPlugin(type) {
        this.get().then(plugins => {
            for (let p in plugins) {
                if (plugins[p].type === type) {
                    return plugins[p];
                }
            }
        })
    }

    get(providing) {
        return super.get(providing).then(plugins => {
            if (providing) {
                return new Map(
                    Object.entries(plugins).filter(([, v]) => {
                        return v.provides.some(p => providing && providing.includes && providing.includes(p))
                }));
            }
            return plugins;
        })
    }

    removeRegistries (plugin) {
        const promises = []
        for (let registry of this.manager.registries) {
            promises.push(Promise.resolve(this.removeRegistry(registry, plugin)))
        }
        return Promise.all(promises);
    }

    removeRegistry (registry, plugin) {
        return Promise.resolve(registry.remove(plugin));
    }

    updateRegistries (plugin) {
        const promises = []
        for (let registry of this.manager.registries) {
            if (registry.schema.id in plugin) {
                promises.push(this.updateRegistry(registry, plugin))
            }
        }
        return Promise.all(promises);
    }

    updateRegistry (registry, plugin) {
        let data = plugin[registry.schema.id];
        if (data && Object.keys(data).length > 0) {
            Object.values(data).map(p => p.plugin = plugin.id)
            return Promise.resolve(registry.register(data));
        }
        return Promise.resolve()
    }
}
