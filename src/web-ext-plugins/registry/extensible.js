
import Registry from 'web-ext-plugins/registry';
import Mutator from 'web-ext-plugins/mutator';
import {NotImplementedError} from 'web-ext-plugins/errors'


export default class ExtensibleRegistry extends Registry {

    constructor (manager) {
        super(manager)
    }

    get types () {
        throw new NotImplementedError()
    }

    get type () {
        throw new NotImplementedError()
    }

    get mutator () {
        return new this.mutatorClass(this.schema.additionalProperties)
    }

    get mutatorClass () {
        return Mutator
    }

    assign (obj) {
        const plugin = obj.plugin
        delete obj["plugin"]
        const result = this.mutate(obj)
        Object.values(result).map(v => {v.plugin = plugin})
        return result
    }

    getExtension(type) {
        return this.types[type][this.type];
    }

    loadExtension(type, data) {
        return this.getExtension(type).load(data)
    }

    assignExtension(type, obj, update) {
        return this.loadExtension(type, obj).then(result => {
            for (let name in update) {
                Object.assign(update[name], result[name])
            }
        })
    }

    assignExtensionTypes(obj, update) {
        const promises = []
        for (let type in this.types) {
            if (type in obj) {
                update[type] = this.assign(obj[type])
                promises.push(this.assignExtension(type, obj[type], update[type]))
            }
        }
        return promises;
    }

    register (obj) {
        const update = {}
        return Promise.all(this.assignExtensionTypes(obj, update)).then(() => {
            return this.get().then(registered => {
                Object.assign(registered, update);
                return this.set(registered)
            })
        })
    }
}
