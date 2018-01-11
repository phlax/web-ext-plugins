

export default class Mutator {

    constructor(schema) {
        this.schema = schema;
    }

    get mutator() {
        if (this.hasAdditionalProperties()) {
            return new this.constructor(this.schema.additionalProperties)
        }
        return new this.constructor(this.schema.items)
    }

    mutate(obj) {
        if (this.schema && this.schema.type === "array") {
            return this.getItems(obj)
        } else {
            let result = {}
            Object.assign(result, this.getProperties(obj))
            Object.assign(result, this.getAdditionalProperties(obj))
            return result
        }
    }

    getItems (obj) {
        const items = []
        for (let item of obj) {
            items.push(this.mutator.mutate(item))
        }
        return items
    }

    getProperties (obj) {
        const result = {}
        if (this.hasProperties()) {
            for (let name of Object.keys(obj)) {
                if (this.hasProperty(name)) {
                    result[name] = obj[name]
                }
            }
        }
        return result
    }

    getAdditionalProperties (obj) {
        const result = {}
        if (this.hasAdditionalProperties()) {
            for (let name in obj) {
                if (!this.hasProperty(name)) {
                    result[name] = this.mutator.mutate(obj[name])
                }
            }
        }
        return result
    }

    hasAdditionalProperties () {
        return Boolean(this.schema && this.schema.type && this.schema.type === "object" && Object.keys(this.schema).indexOf("additionalProperties") !== -1)
    }

    hasProperties () {
        return Boolean(this.schema && Object.keys(this.schema).indexOf("properties") !== -1)
    }

    hasProperty (name) {
        return Boolean(this.hasProperties() && Object.keys(this.schema.properties).indexOf(name) !== -1)
    }
}
