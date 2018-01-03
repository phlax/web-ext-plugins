
class Mocker {
    constructor(attrs) {
        Object.assign(this, attrs);
    }
}

export default class RunAmock {

    constructor() {
        this.mockerClass = Mocker
        this.mocked = []
    }

    mockConstructor(attrs) {
        const getInstantiator = function(clss) {
            return function(){
                return new clss(attrs);
            }
        }
        return jest.fn().mockImplementation(getInstantiator(this.mockerClass, attrs));
    }

    mockConstructors(constructors) {
        for (let [mocked, key, attrs] of constructors) {
            this.mocked.push([mocked, key, mocked[key]])
            mocked[key] = this.mockConstructor(attrs);
        }
    }

    unmockConstructors() {
        for (let [mocked, key, original] of this.mocked) {
            mocked[key] = original;
        }
    }

    withMockedConstructors(constructors, cb){
        this.mockConstructors(constructors);
        cb()
        this.unmockConstructors();
    }

    withMockedMethod(mocked, name, handler, cb) {
        const original = Object.getPrototypeOf(handler)[name]
        Object.getPrototypeOf(mocked)[name] = handler;
        cb()
        if (original) {
            Object.getPrototypeOf(mocked)[name] = original;
        } else {
            delete Object.getPrototypeOf(mocked)[name];
        }
    }
}
