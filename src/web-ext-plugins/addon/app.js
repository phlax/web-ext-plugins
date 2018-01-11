
import Plugin from './plugin';


export default class AppPlugin extends Plugin {

    getApp(app) {
        return new this.app(this, app);
    }

    handleGetAltSrc(request, sendResponse) {
        browser.tabs.query({
            currentWindow: true,
            active: true
        }).then(tabs => {
            for (let tab of tabs) {
                browser.tabs.sendMessage(
                    tab.id,
                    request).then(sendResponse);
            }
        });
        return true;
    }

    getInstalledApps() {
        return this.handler.sendMessage({message: 'getApps'});
    }
}
