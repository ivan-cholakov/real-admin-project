/* eslint-disable */

import AlmondClient from 'almond-client-sdk';
import { Config } from './config';

const config = new Config();

export const client = new AlmondClient({
    host: config.getHost(),
    port: config.getPort(),
    protocol: config.getProtocol(),
    suffix: config.getApiUri(),
    version: config.getApiVersion(),
});
