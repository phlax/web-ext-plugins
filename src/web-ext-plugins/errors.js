
export class NotImplementedError extends Error {

    constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, NotImplementedError)
    }
}

NotImplementedError.prototype = Error.prototype;


export class ValidationError extends Error {

    constructor(...args) {
        super(...args)
        // Error.captureStackTrace(this, ValidationError)
    }
}

ValidationError.prototype = Error.prototype;
