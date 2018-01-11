
export default class PluginUpdater {
    constructor(manager) {
	this.manager = manager;
    }

    fetchProjects(app) {
        return browser.runtime.sendMessage(
            app.type,
            {message: 'fetchProjects',
             app: app})
    }

    updateApps() {
        return this.manager.apps.get().then(() => {
            return
        })
    }
}
