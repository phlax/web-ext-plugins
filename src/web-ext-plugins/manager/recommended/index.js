
import Registry from 'web-ext-plugins/registry';
import RecommendedFilter from './filter';
import schema from 'web-ext-plugins/schema/recommended.json';


export default class RecommendedRegistry extends Registry {

    constructor(manager) {
        super(manager)
        this.filterHandler = new RecommendedFilter(manager)
    }

    get schema () {
        return schema
    }

    assign (obj) {
        const plugin = obj.apps.plugin
        let update = this._filterAppTypes(obj)
        if (update) {
            return this._mapPlugins(plugin, this.mutate({apps: update}))
        }
    }

    get (filter) {
        if (filter) {
            return this.filter(filter)
        }
        return super.get()
    }

    filter (filter) {
        return super.get(filter).then(recommended => {
            return this.filterHandler.handle(filter, recommended)
        });
    }

    remove (plugin) {
        return this.get().then(objects => {
            let update = false;
            for (let [, data] of Object.entries(objects)) {
                for (let [name, items] of Object.entries(data)) {
                    data[name] = items.filter(item => {return Boolean(item.plugin !== plugin)})
                    update = items.length !== data[name].length;
                }
            }
            if (update) {
                return this.set(objects);
            }
            return Promise.resolve()
        });
    }

    register(obj) {
        if (Object.keys(obj).indexOf("apps") === -1 || !obj["apps"].plugin) {
            return Promise.resolve()
        }
        return this.remove(obj["apps"].plugin).then(() => {
            return this.get().then(installed => {
                if (this._assign(installed, obj)) {
                    return this.set(installed)
                }
                return Promise.resolve()
            })
        })
    }

    _assign (installed, obj) {
        const update = this.assign(obj)
        if (!update || Object.keys(update).indexOf("apps") === -1) {
            return
        }
        if (Object.keys(installed).indexOf("apps") === -1) {
            installed["apps"] = {}
        }
        for (let name of Object.keys(update["apps"])) {
            if (Object.keys(installed["apps"]).indexOf(name) === -1) {
                installed["apps"][name] = update["apps" ][name];
            } else {
                installed["apps"][name] = installed["apps"][name].concat(update["apps"][name])
            }
        }
        return Object.keys(update["apps"]).length > 0;
    }

    _filterAppTypes(obj) {
        let newobj = Object.entries(obj['apps']).filter(([k, ]) => {
            return (Object.keys(this.manager.appTypes).indexOf(k) !== -1)
        })
        if (!newobj.length) {
            return
        }
        return Object.assign(...newobj.map(([k, v]) => ({[k]: v})));
    }

    _mapPlugins (plugin, result) {
        Object.values(result["apps"]).map(items => {
            items.map(item => {
                item.plugin = plugin;
            })
        })
        return result
    }
}
