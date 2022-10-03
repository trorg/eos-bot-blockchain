import { Endpoint, ChainID, Wallet, Action, SimpleAction, TransactConfig } from './interfaces';
/**
 */
export declare class Blockchain {
    chainId: ChainID;
    wallet?: Wallet;
    private api;
    constructor(endpoints: Endpoint[], chainId: ChainID, wallet?: Wallet);
    get rpc(): import("eosjs").JsonRpc;
    get signatureProvider(): import("eosjs/dist/eosjs-api-interfaces").SignatureProvider;
    /**
     * Query any blockchain info
     */
    query(method: string, ...args: any): Promise<any>;
    queryTable(name: string, args: any): Promise<any>;
    /**
     * Send transaction to blockchain
     */
    transaction(simpleActions: SimpleAction[] | Action[], config: TransactConfig): Promise<any>;
}
