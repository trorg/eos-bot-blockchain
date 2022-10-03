import { ApiInterfaces, RpcInterfaces, Serialize } from 'eosjs';
export declare type Action = Serialize.Action;
export declare type Authorization = Serialize.Authorization;
export declare type TransactConfig = ApiInterfaces.TransactConfig;
export declare type SimpleAction = Omit<Serialize.Action, 'authorization'> & {
    authorization?: Authorization[];
};
export declare type AbiBinToJsonResult = RpcInterfaces.AbiBinToJsonResult;
export declare type AbiJsonToBinResult = RpcInterfaces.AbiJsonToBinResult;
export declare type GetAbiResult = RpcInterfaces.GetAbiResult;
export declare type GetAccountResult = RpcInterfaces.GetAccountResult;
export declare type GetAccountsByAuthorizersResult = RpcInterfaces.GetAccountsByAuthorizersResult;
export declare type GetActivatedProtocolFeaturesResult = RpcInterfaces.GetActivatedProtocolFeaturesResult;
export declare type GetBlockInfoResult = RpcInterfaces.GetBlockInfoResult;
export declare type GetBlockResult = RpcInterfaces.GetBlockResult;
export declare type GetBlockHeaderStateResult = RpcInterfaces.GetBlockHeaderStateResult;
export declare type GetCodeHashResult = RpcInterfaces.GetCodeHashResult;
export declare type GetCurrencyStatsResult = RpcInterfaces.GetCurrencyStatsResult;
export declare type GetInfoResult = RpcInterfaces.GetInfoResult;
export declare type GetProducerScheduleResult = RpcInterfaces.GetProducerScheduleResult;
export declare type GetProducersResult = RpcInterfaces.GetProducersResult;
export declare type GetRawCodeAndAbiResult = RpcInterfaces.GetRawCodeAndAbiResult;
export declare type GetRawAbiResult = RpcInterfaces.GetRawAbiResult;
export declare type GetScheduledTransactionsResult = RpcInterfaces.GetScheduledTransactionsResult;
export declare type GetTableRowsResult = RpcInterfaces.GetTableRowsResult;
export declare type GetTableByScopeResult = RpcInterfaces.GetTableByScopeResult;
export declare type ReadOnlyTransactResult = RpcInterfaces.ReadOnlyTransactResult;
export declare type DBSizeGetResult = RpcInterfaces.DBSizeGetResult;
export declare type TraceApiGetBlockResult = RpcInterfaces.TraceApiGetBlockResult;
export declare type GetActionsResult = RpcInterfaces.GetActionsResult;
export declare type GetTransactionResult = RpcInterfaces.GetTransactionResult;
export declare type GetKeyAccountsResult = RpcInterfaces.GetKeyAccountsResult;
export declare type GetControlledAccountsResult = RpcInterfaces.GetControlledAccountsResult;
export declare type QueryResult = AbiBinToJsonResult | AbiJsonToBinResult | GetAbiResult | GetAccountResult | GetAccountsByAuthorizersResult | GetActivatedProtocolFeaturesResult | GetBlockInfoResult | GetBlockResult | GetBlockHeaderStateResult | GetCodeHashResult | GetCurrencyStatsResult | GetInfoResult | GetProducerScheduleResult | GetProducersResult | GetRawCodeAndAbiResult | GetRawAbiResult | GetScheduledTransactionsResult | GetTableRowsResult | GetTableByScopeResult | ReadOnlyTransactResult | DBSizeGetResult | TraceApiGetBlockResult | GetActionsResult | GetTransactionResult | GetKeyAccountsResult | GetControlledAccountsResult;
/**
 */
export interface Wallet {
    account: string;
    keys: string[];
}
export declare type Endpoint = string;
export declare type ChainID = string;
export declare type RpcFetchMethod = (input?: any, init?: any) => Promise<any>;
export interface BlockchainConfigArgs {
    wallet?: Wallet;
    fetch?: RpcFetchMethod;
}
