
export const extension = {
    connect: jest.fn(function({ name }) {
        const connection = {
            name,
            getURL: jest.fn(),
        };
        return connection;
    }),
    getURL: jest.fn((message) => {
        return 'URL::' + message + '::URL';
    }),
    onMessage: {
        addListener: jest.fn(),
    },
    onConnect: {
        addListener: jest.fn(),
    },
};


export const i18n = {
    getMessage: jest.fn((message) => {
        return 'L10N::' + message + '::L10N';
    }),
};

export const notifications = {
    create: jest.fn()
};

export const getManifest = jest.fn(() => {})

browser.extension = extension
browser.i18n = i18n
browser.notifications = notifications
browser.runtime.getManifest = getManifest
