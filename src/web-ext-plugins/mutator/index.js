

export default class Mutator {

    constructor(schema) {
        this.schema = schema || {};
    }

    getMutator(schema) {
        return new this.constructor(schema)
    }

    get additionalProperties () {
        const {additionalProperties} = this.schema
        return additionalProperties
    }

    get properties () {
        const {properties} = this.schema
        return properties
    }

    get type () {
        const {type} = this.schema
        return type
    }

    mutate(obj) {
        const result = {}
        let type = this.type;
        let objtype = typeof(obj)
        if (this.type instanceof Array) {
            let types = [...this.type]
            if (objtype === 'object' && types.indexOf('array') !== -1 && Array.isArray(obj)) {
                objtype = 'array'
            }
            // both numbers and integers are recognised, but only numbers are
            // returned
            if (types.indexOf('integer') !== -1 && types.indexOf('number') === -1) {
                types.push('number')
            }
            if (types.indexOf(typeof(obj)) !== -1) {
                type = objtype;
            }
        }
        switch (type) {
        case "array":
            return this.mutateItems(obj)
        case "object":
            Object.assign(result, this.mutateProperties(obj))
            Object.assign(result, this.mutateAdditionalProperties(obj))
            return result
        case "string":
            return obj.toString();
        case "number":
            return parseInt(obj);
        case "integer":
            return parseInt(obj);
        case "boolean":
            return Boolean(obj);
        }
    }

    mutateItems (obj) {
        const items = []
        for (let item of obj) {
            items.push(this.getMutator(this.schema.items).mutate(item))
        }
        return items
    }

    mutateProperties (obj) {
        const result = {}
        for (let [name, property] of Object.entries(this.properties || {})) {
            if (Object.keys(obj).indexOf(name) !== -1) {
                result[name] = this.getMutator(property).mutate(obj[name])
            }
        }
        return result
    }

    mutateAdditionalProperties (obj) {
        const result = {}
        if (this.hasAdditionalProperties()) {
            for (let name in obj) {
                if (!this.hasProperty(name)) {
                    result[name] = this.getMutator(this.additionalProperties).mutate(obj[name])
                }
            }
        }
        return result
    }

    hasAdditionalProperties () {
        return Boolean(this.type === "object" && this.additionalProperties)
    }

    hasProperty (name) {
        return Boolean(this.properties && Object.keys(this.properties).indexOf(name) !== -1)
    }
}
