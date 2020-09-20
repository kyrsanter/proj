import {HeadersType} from "../types";
const CORSHeadersBuilder = (config: any) => {
    const headers: HeadersType = {};
    if (config.origin) {
        headers["Access-Control-Allow-Origin"] = config.origin;
    }
    if (config.methods) {
        headers["Access-Control-Allow-Methods"] = config.methods;
    }
    if (config.headers) {
        headers["Access-Control-Allow-Headers"] = config.headers;
    }
    return headers;
};
module.exports = CORSHeadersBuilder;