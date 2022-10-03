import { ApiInterfaces, Serialize } from 'eosjs';


export type Action = Serialize.Action;
export type Authorization = Serialize.Authorization;
export type TransactConfig = ApiInterfaces.TransactConfig;
export type SimpleAction = Omit<Serialize.Action, 'authorization'> & { authorization?: Authorization[] };

/**
 */
export interface Wallet {
    account: string,
    keys: string[],
}

export type Endpoint = string;
export type ChainID = string;

export interface BlockchainArgs {
    endpoints: Endpoint[],
    args: {
        fetch?: (input?: any, init?: any) => Promise<any>
    },
}

