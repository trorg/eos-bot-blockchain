import { ApiInterfaces, Serialize } from 'eosjs';
export declare type Action = Serialize.Action;
export declare type Authorization = Serialize.Authorization;
export declare type TransactConfig = ApiInterfaces.TransactConfig;
export declare type SimpleAction = Omit<Serialize.Action, 'authorization'> & {
    authorization?: Authorization[];
};
/**
 */
export interface Wallet {
    account: string;
    keys: string[];
}
export declare type Endpoint = string;
export declare type ChainID = string;
export interface BlockchainArgs {
    endpoints: Endpoint[];
    args: {
        fetch?: (input?: any, init?: any) => Promise<any>;
    };
}
