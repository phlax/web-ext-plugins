
import FilterHandler from 'web-ext-plugins/automagic/filter';


export default class RecommendedFilter extends FilterHandler {

    constructor(manager) {
        super(manager)
        this.manager = manager
    }

    _filterInactive (recommendations, installed) {
        const active = Object.entries(recommendations).filter(([, v]) => {
            return !(installed.some(([k2, v2]) => (k2 === v.name && v.url === v2)));
        });
        if (active.length) {
            return Object.assign(...active.map(([k, v]) => ({[k]: v})));
        }
    }

    filterInactive(recommended, inactive) {
        let {apps} = recommended;
        apps = apps || {}
        if (!inactive) {
            return Promise.resolve(recommended)
        }
        const newResult = {};
        return this.manager.apps.get().then(installed => {
            installed = installed || []
            installed = Object.values(installed).map(app => [app.name, app.url]);
            for (let [k1, recommendations] of Object.entries(apps)) {
                const filtered = this._filterInactive(recommendations, installed)
                if (filtered && Object.keys(filtered).length > 0) {
                    newResult[k1] = filtered
                }
            }
            recommended.apps = newResult
            return recommended
        })
    }

    handle(filter, data) {
        const promises = [];
        Object.entries(filter).forEach(([name, args]) => {
            promises.push(super.handle(name, data, args))
        })
        return Promise.all(promises).then(results => {
            return results.pop();
        })
    }
}
