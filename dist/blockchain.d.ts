import { Endpoint, ChainID, Wallet, Action, SimpleAction, TransactConfig, QueryResult, BlockchainConfigArgs } from './interfaces';
/**
 */
export declare class Blockchain {
    chainId: ChainID;
    private api;
    wallet: Wallet;
    constructor(endpoints: Endpoint[], chainId: ChainID, args?: BlockchainConfigArgs);
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
