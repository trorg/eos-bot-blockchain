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
exports.Blockchain = void 0;
const eosjs_1 = require("eosjs");
const eosjs_jssig_1 = require("eosjs/dist/eosjs-jssig");
const rpc_1 = require("./rpc");
/**
 */
class Blockchain {
    constructor(endpoints, chainId, args = {}) {
        this.chainId = chainId;
        if (!endpoints.length) {
            throw new Error('Endpoints length must me greater than 0');
        }
        let signatureProvider = null;
        if (args.wallet) {
            this.wallet = args.wallet;
            signatureProvider = new eosjs_jssig_1.JsSignatureProvider(this.wallet.keys);
        }
        const rpc = new rpc_1.Rpc(endpoints, { fetch: args.fetch });
        this.api = new eosjs_1.Api({
            chainId,
            rpc,
            signatureProvider,
            textDecoder: new TextDecoder(),
            textEncoder: new TextEncoder(),
        });
    }
    get rpc() {
        return this.api.rpc;
    }
    get signatureProvider() {
        return this.api.signatureProvider;
    }
    /**
     * Query any blockchain info
     */
    query(method, ...args) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                try {
                    return this.api.rpc[method](args);
                }
                catch (e) {
                    if (e instanceof eosjs_1.RpcError) {
                        if ((_d = (_c = (_b = (_a = e.json) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.details[0]) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.includes('unknown key')) {
                            return;
                        }
                        break;
                    }
                }
                throw new Error('Filed to fetch from RPC servers');
            }
        });
    }
    /**
     * Send transaction to blockchain
     */
    transaction(simpleActions, config) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.wallet) {
                throw new Error('No wallet defined. Can send transaction without wallet.');
            }
            const actions = simpleActions.map(action => {
                if (!action.hasOwnProperty('authorization')) {
                    action.authorization = [
                        {
                            actor: this.wallet.account,
                            permission: 'active',
                        }
                    ];
                    return new Object(action);
                }
            });
            let error;
            for (let i = 0; i <= 3; i++) {
                try {
                    this.api.transact({ actions }, config);
                }
                catch (e) {
                    if ((_a = e.message) === null || _a === void 0 ? void 0 : _a.includes('assertion failure')) {
                        throw e;
                    }
                    if ((_b = e.message) === null || _b === void 0 ? void 0 : _b.includes('billed CPU time')) {
                        throw e;
                    }
                    error = e;
                }
            }
            throw error;
        });
    }
}
exports.Blockchain = Blockchain;
