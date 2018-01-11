
import Registry from 'web-ext-plugins/registry';

import schema from 'web-ext-plugins/schema/notifications.json';


export default class PluginNotifications extends Registry {

    get schema () {
        return schema
    }

    notify(notification, request) {
        // this needs to check notification is enabled and localize for addons
        return this.get().then(notifications => {
            if (notification in notifications) {
                browser.notifications.create({
                    "type": "basic",
                    "title": browser.i18n.getMessage(notifications[notification].name),
                    "message": request.message
                })
            }
        })
    }
}
