import { ApiInterfaces, RpcInterfaces, Serialize } from 'eosjs';


export type Action = Serialize.Action;
export type Authorization = Serialize.Authorization;
export type TransactConfig = ApiInterfaces.TransactConfig;
export type SimpleAction = Omit<Serialize.Action, 'authorization'> & { authorization?: Authorization[] };

export type AbiBinToJsonResult = RpcInterfaces.AbiBinToJsonResult;
export type AbiJsonToBinResult = RpcInterfaces.AbiJsonToBinResult;
export type GetAbiResult = RpcInterfaces.GetAbiResult;
export type GetAccountResult = RpcInterfaces.GetAccountResult;
export type GetAccountsByAuthorizersResult = RpcInterfaces.GetAccountsByAuthorizersResult;
export type GetActivatedProtocolFeaturesResult = RpcInterfaces.GetActivatedProtocolFeaturesResult;
export type GetBlockInfoResult = RpcInterfaces.GetBlockInfoResult;
export type GetBlockResult = RpcInterfaces.GetBlockResult;
export type GetBlockHeaderStateResult = RpcInterfaces.GetBlockHeaderStateResult;
export type GetCodeHashResult = RpcInterfaces.GetCodeHashResult;
export type GetCurrencyStatsResult = RpcInterfaces.GetCurrencyStatsResult;
export type GetInfoResult = RpcInterfaces.GetInfoResult;
export type GetProducerScheduleResult = RpcInterfaces.GetProducerScheduleResult;
export type GetProducersResult = RpcInterfaces.GetProducersResult;
export type GetRawCodeAndAbiResult = RpcInterfaces.GetRawCodeAndAbiResult;
export type GetRawAbiResult = RpcInterfaces.GetRawAbiResult;
export type GetScheduledTransactionsResult = RpcInterfaces.GetScheduledTransactionsResult;
export type GetTableRowsResult = RpcInterfaces.GetTableRowsResult;
export type GetTableByScopeResult = RpcInterfaces.GetTableByScopeResult;
export type ReadOnlyTransactResult = RpcInterfaces.ReadOnlyTransactResult;
export type DBSizeGetResult = RpcInterfaces.DBSizeGetResult;
export type TraceApiGetBlockResult = RpcInterfaces.TraceApiGetBlockResult;
export type GetActionsResult = RpcInterfaces.GetActionsResult;
export type GetTransactionResult = RpcInterfaces.GetTransactionResult;
export type GetKeyAccountsResult = RpcInterfaces.GetKeyAccountsResult;
export type GetControlledAccountsResult = RpcInterfaces.GetControlledAccountsResult;

export type QueryResult = AbiBinToJsonResult
  | AbiJsonToBinResult
  | GetAbiResult
  | GetAccountResult
  | GetAccountsByAuthorizersResult
  | GetActivatedProtocolFeaturesResult
  | GetBlockInfoResult
  | GetBlockResult
  | GetBlockHeaderStateResult
  | GetCodeHashResult
  | GetCurrencyStatsResult
  | GetInfoResult
  | GetProducerScheduleResult
  | GetProducersResult
  | GetRawCodeAndAbiResult
  | GetRawAbiResult
  | GetScheduledTransactionsResult
  | GetTableRowsResult
  | GetTableByScopeResult
  | ReadOnlyTransactResult
  | DBSizeGetResult
  | TraceApiGetBlockResult
  | GetActionsResult
  | GetTransactionResult
  | GetKeyAccountsResult
  | GetControlledAccountsResult;


/**
 */
export interface Wallet {
    account: string,
    keys: string[],
}

export type Endpoint = string;
export type RpcFetchMethod = (input?: any, init?: any) => Promise<any>;
