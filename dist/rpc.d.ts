import { JsonRpc } from 'eosjs';
import { Endpoint, RpcFetchMethod } from './interfaces';
export declare class Rpc extends JsonRpc {
    private rpc;
    private endpoints;
    constructor(args?: {
        endpoints?: Endpoint[];
        fetch?: RpcFetchMethod;
    });
    fetch(path: string, body: any): Promise<any>;
}
