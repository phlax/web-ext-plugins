
import logger from 'web-ext-plugins/logger';


export default class Localizer {

    localizeExternally (text, l10n) {
        const message = {message: "localize", text: text}
        return browser.runtime.sendMessage(l10n, message).then(result => result.text).catch(e => {
            logger.err(this, 'Failed localizing', [e, this.props])
            return '';
        })
    }

    localizeInternally (text) {
        return Promise.resolve(browser.i18n.getMessage(text))
    }

    localize(text, l10n) {
        if (l10n) {
            return this.localizeExternally(text, l10n)
        }
        return this.localizeInternally(text);
    }
}
