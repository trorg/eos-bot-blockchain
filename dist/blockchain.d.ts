import { Endpoint, Wallet, Action, RpcFetchMethod, SimpleAction, TransactConfig, QueryResult } from './interfaces';
/**
 */
export declare class Blockchain {
    private api;
    wallet: Wallet;
    constructor(args: {
        chainId: string;
        enpoints?: Endpoint[];
        wallet?: Wallet;
        fetch?: RpcFetchMethod;
    });
    get rpc(): import("eosjs").JsonRpc;
    get signatureProvider(): import("eosjs/dist/eosjs-api-interfaces").SignatureProvider;
    /**
     * Query any blockchain info
     */
    query(method: string, ...args: any): Promise<QueryResult>;
    /**
     * Send transaction to blockchain
     */
    transaction(simpleActions: SimpleAction[] | Action[], config: TransactConfig): Promise<any>;
}
