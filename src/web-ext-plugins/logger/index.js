

class Logger {

    _write (msg, type) {
        msg, type
        // console[type || "log"](msg)
    }

    err(context, message, info) {
        this._write(context.constructor.name + ": " +message)
        if (info) {
            this._write(info, 'error')
        }
    }

    log(context, message, info) {
        this._write(context.constructor.name + ": " +message)
        if (info) {
            this._write(info)
        }
    }
}

const logger = new Logger()
export default logger
