"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rpc = void 0;
const eosjs_1 = require("eosjs");
const node_fetch_1 = require("node-fetch");
const random_useragent_1 = require("random-useragent");
const defaultEndpoints = [
    'https://wax.greymass.com',
    'https://wax.eosphere.io',
    'https://wax.cryptolions.io',
    'https://api.waxsweden.org',
    'https://waxapi.ledgerwise.io',
    'https://apiwax.3dkrender.com',
    'https://wax.blacklusion.io',
    'https://wax.dapplica.io',
    'https://wax-api.eosiomadrid.io',
    'https://wax.eosdac.io',
    'https://api.wax.liquidstudios.io',
    'https://wax.pink.gg',
    'https://wax.eosrio.io',
    'https://api.wax.bountyblok.io',
    'https://wax.eosdublin.io',
    'https://api.tokengamer.io',
    'https://wax.eosusa.news',
    'https://wax-bp.wizardsguild.one',
    'https://wax.eu.eosamsterdam.net',
    'https://wax.blokcrafters.io',
    'https://api.wax.alohaeos.com',
    'https://wax.hkeos.com',
    'https://api.wax.greeneosio.com',
];
/**
 * Default fetch method
 */
const defaultFetch = (path, args) => __awaiter(void 0, void 0, void 0, function* () {
    const ripa = [];
    for (let i = 0; i <= 3; i++) {
        ripa.push(Math.floor(Math.random() * 249) + 23);
    }
    const rip = ripa.join('.');
    const controller = new AbortController();
    const config = {
        headers: {
            'User-Agent': random_useragent_1.default.getRandom(),
            'X-Forwarded-For': rip,
            'X-Real-IP': rip,
        },
        signal: controller.signal,
    };
    args = Object.assign(Object.assign({}, args), config);
    const timeout = setTimeout(controller.abort, 40000);
    const response = yield (0, node_fetch_1.default)(path, args);
    clearTimeout(timeout);
    return response;
});
class Rpc extends eosjs_1.JsonRpc {
    constructor(args = {}) {
        let fetch = args.fetch ? args.fetch : defaultFetch;
        const endpoints = args.endpoints.length > 0 ? args.endpoints : defaultEndpoints;
        super(endpoints[0], { fetch });
        this.endpoints = endpoints.map((endpoint) => {
            if (endpoint[endpoint.length - 1] == '/') {
                endpoint = endpoint.substr(0, endpoint.length - 1);
            }
            return endpoint;
        });
    }
    fetch(path, body) {
        const _super = Object.create(null, {
            endpoint: { get: () => super.endpoint, set: v => super.endpoint = v },
            fetch: { get: () => super.fetch, set: v => super.fetch = v }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.endpoint = this.endpoints[Math.floor(Math.random() * this.endpoints.length)];
            return _super.fetch.call(this, path, body);
        });
    }
}
exports.Rpc = Rpc;
