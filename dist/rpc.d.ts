import { JsonRpc } from 'eosjs';
import { Endpoint } from './interfaces';
export declare class Rpc extends JsonRpc {
    private rpc;
    private endpoints;
    constructor(endpoints: Endpoint[], args?: {
        fetch?: (input?: any, init?: any) => Promise<any>;
    });
    fetch(path: string, body: any): Promise<any>;
}
