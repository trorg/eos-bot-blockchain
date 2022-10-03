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
    constructor(endpoints, args = {}) {
        if (!args.fetch) {
            args.fetch = node_fetch_1.default;
        }
        super(endpoints[0], args);
        this.endpoints = this.endpoints.map((endpoint) => {
            if (endpoint[endpoint.length - 1] == '/') {
                endpoint = endpoint.substr(0, endpoint.length - 1);
            }
            return endpoint;
        });
    }
    fetch(path, body) {
        const _super = Object.create(null, {
            fetch: { get: () => super.fetch }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.endpoint = this.endpoints[Math.floor(Math.random() * this.endpoints.length)];
            return _super.fetch.call(this, path, body);
        });
    }
}
exports.Rpc = Rpc;
