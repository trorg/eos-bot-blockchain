import { Api, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import {
  Endpoint,
  ChainID,
  Wallet,
  Action,
  SimpleAction,
  Authorization,
  TransactConfig,
} from './interfaces';
import { Rpc } from './rpc';


/**
 */
export class Blockchain {
  private api: Api;

  constructor(endpoints: Endpoint[], public chainId: ChainID, public wallet?: Wallet) {
    if (!endpoints.length) {
      throw new Error('Endpoints length must me greater than 0');
    }

    let signatureProvider = null;
    if (wallet) {
      signatureProvider = new JsSignatureProvider(wallet.keys);
    }

    const rpc = new Rpc(endpoints);
    this.api = new Api({
      chainId,
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
    });
  }

  get rpc() {
    return this.api.rpc;
  }

  get signatureProvider() {
    return this.api.signatureProvider;
  }

  /**
   * Query any blockchain info
   */
  public async query(method: string, ...args: any): Promise<any> {
    while (true) {
      try {
        return this.api.rpc[method](args);
      } catch(e) {
        if (e instanceof RpcError) {
          if (e.json?.error?.details[0]?.message?.includes('unknown key')) {
            return;
          }
          break;
        }
      }

      throw new Error('Filed to fetch from RPC servers');
    }
  }

  public async queryTable(name: string, args: any): Promise<any> {
    const { rows } = await this.query('get_table_rows', args);
    return rows;
  }

  /**
   * Send transaction to blockchain
   */
  public async transaction(simpleActions: SimpleAction[] | Action[], config: TransactConfig): Promise<any> {
    if (!this.wallet) {
      throw new Error('No wallet defined. Can send transaction without wallet.');
    }

    const actions: Action[] = simpleActions.map(action => {
      if (!action.hasOwnProperty('authorization')) {
        action.authorization = [
          {
            actor: this.wallet.account,
            permission: 'active',
          }
        ];
        return new Object(action as unknown) as Action;
      }
    });

    let error;
    for (let i = 0; i <= 3; i++) {
      try {
        this.api.transact({ actions }, config);
      } catch(e) {
        if (e.message?.includes('assertion failure')) {
          throw e;
        }
        if (e.message?.includes('billed CPU time')) {
          throw e;
        }
        error = e;
      }
    }

    throw error;
  }
}

