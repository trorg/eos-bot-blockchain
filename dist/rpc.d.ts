import { JsonRpc } from 'eosjs';
import { Endpoint, RpcFetchMethod } from './interfaces';
export declare class Rpc extends JsonRpc {
    private rpc;
    private endpoints;
    constructor(endpoints: Endpoint[], args?: {
        fetch?: RpcFetchMethod;
    });
    fetch(path: string, body: any): Promise<any>;
}
