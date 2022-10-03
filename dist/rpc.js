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
class Rpc extends eosjs_1.JsonRpc {
    constructor(endpoints, args = {}) {
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
