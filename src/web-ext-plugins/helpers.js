

class _Objectively {

    getAllPropertyNames(obj) {
        const p = [];
        for (; obj != null; obj = Object.getPrototypeOf(obj)) {
            let op = Object.getOwnPropertyNames(obj);
            for (var i=0; i<op.length; i++)
                if (p.indexOf(op[i]) == -1)
                    p.push(op[i]);
        }
        return p;
    }

    getAllMethodNames(obj) {
        const methodNames = [];
        for (let p of this.getAllPropertyNames(obj)) {
            try {
                if (this.isCallable(obj[p])) {
                    methodNames.push(p);
                }
            } catch (err) {
                {err}
            }
        }
        return methodNames
    }

    isCallable(obj) {
        const getType = {};
        return obj && getType.toString.call(obj) === '[object Function]';
    }
}

const Objectively = new _Objectively();
export default Objectively;
