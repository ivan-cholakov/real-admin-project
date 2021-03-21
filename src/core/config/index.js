// eslint-disable-next-line no-undef

// eslint-disable-next-line no-undef
const currConfig = process.env.REACT_APP_ENV;
// eslint-disable-next-line no-undef
const config = require(`./${currConfig}.json`);

export class Config {
    constructor() {
        this.config = config;
    }
    getBaseUrl() {
        return `${this.getProtocol()}://${this.getHost()}:${this.getPort()}`;
    }
    getHost() {
        return this.config.Connection.API_HOST;
    }
    getPort() {
        return this.config.Connection.API_PORT;
    }
    getApiUri() {
        return this.config.Connection.API_URI;
    }
    getProtocol() {
        return this.config.Connection.API_PROTOCOL;
    }
    getApiVersion() {
        return this.config.Connection.API_VERSION;
    }
    getInstagramCredentials() {
        return this.config.instagramCredentials;
    }
    getInstagramAuthUrl() {
        return this.config.Connection.INSTAGRAM_AUTH;
    }
}
