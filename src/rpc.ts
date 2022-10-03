import { JsonRpc } from 'eosjs';
import { Endpoint } from './interfaces';


export class Rpc extends JsonRpc {
    private rpc: JsonRpc;
    private endpoints: Endpoint[];

    constructor(
        endpoints: Endpoint[],
        args: {
            fetch?: (input?: any, init?: any) => Promise<any>
        } = {}
    ) {
        super(endpoints[0], args);
        this.endpoints = this.endpoints.map((endpoint: Endpoint) => {
            if (endpoint[endpoint.length-1] == '/') {
                endpoint = endpoint.substr(0, endpoint.length-1);
            }
            return endpoint;
        });
    }

    public async fetch(path: string, body: any): Promise<any> {
        this.endpoint = this.endpoints[Math.floor(Math.random() * this.endpoints.length)];
        return super.fetch(path, body);
    }
}

