
import ExternalRequestsHandler from 'web-ext-plugins/automagic/request'


export default class PluginHandler extends ExternalRequestsHandler {

    constructor(manager) {
        super()
        this.manager = manager;
    }

    uninstallHandler(info) {
        return this.manager.plugins.remove(info.id);
    }

    addListeners() {
        super.addListeners()
        browser.management.onUninstalled.addListener(this.uninstallHandler.bind(this));
    }

    getRequestHeaders() {
        let headers = new Headers()
        headers.append('X-Requested-With', 'XMLHttpRequest');
        return headers;
    }

    handleRegisterPlugin(request, sender) {
        request.sender = sender
        return this.manager.plugins.register(request)
    }

    handleFetch(request) {
        const payload = {
            method: 'GET',
            headers: this.manager.getRequestHeaders()}
        return window.fetch(request.endpoint, payload).then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        }).then(blob => {
            return Promise.resolve(blob);
        }).catch(() => {
            // console.log('errored still sadly')
            // console.log(err)
        });
    }

    handleGetApps() {
        return this.manager.apps.get();
    }
}
