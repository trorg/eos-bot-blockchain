import { JsonRpc } from 'eosjs';
import fetch from 'node-fetch';
import randUserAgent from 'random-useragent';
import { Endpoint, RpcFetchMethod } from './interfaces';

const defaultEndpoints: Endpoint[] = [
  'https://wax.greymass.com',
  'https://wax.eosphere.io',
  'https://wax.cryptolions.io',
  'https://api.waxsweden.org',
  'https://waxapi.ledgerwise.io',
  'https://apiwax.3dkrender.com',
  'https://wax.blacklusion.io',
  'https://wax.dapplica.io',
  'https://wax-api.eosiomadrid.io',
  'https://wax.eosdac.io',
  'https://api.wax.liquidstudios.io',
  'https://wax.pink.gg',
  'https://wax.eosrio.io',
  'https://api.wax.bountyblok.io',
  'https://wax.eosdublin.io',
  'https://api.tokengamer.io',
  'https://wax.eosusa.news',
  'https://wax-bp.wizardsguild.one',
  'https://wax.eu.eosamsterdam.net',
  'https://wax.blokcrafters.io',
  'https://api.wax.alohaeos.com',
  'https://wax.hkeos.com',
  'https://api.wax.greeneosio.com',
];

/**
 * Default fetch method
 */
const defaultFetch = async (path: string, args: any) => {
  const ripa: number[] = [];
  for (let i = 0; i <= 3; i++) {
    ripa.push(Math.floor(Math.random() * 249) + 23);
  }
  const rip: string = ripa.join('.');
  const controller = new AbortController();
  const config = {
    headers: {
      'User-Agent': randUserAgent.getRandom(),
      'X-Forwarded-For': rip,
      'X-Real-IP': rip,
    },
    signal: controller.signal,
  };
  args = { ...args, ...config };
  const timeout = setTimeout(controller.abort, 40000);
  const response = await fetch(path, args);
  clearTimeout(timeout);
  return response;
};


export class Rpc extends JsonRpc {
  private rpc: JsonRpc;
  private endpoints: Endpoint[];

  constructor(
    args: {
      endpoints?: Endpoint[],
      fetch?: RpcFetchMethod,
    } = {}
  ) {
    let fetch = args.fetch ? args.fetch : defaultFetch;
    const endpoints = args.endpoints.length > 0 ? args.endpoints : defaultEndpoints;
    super(endpoints[0], { fetch });
    this.endpoints = endpoints.map((endpoint: Endpoint) => {
      if (endpoint[endpoint.length-1] == '/') {
        endpoint = endpoint.substr(0, endpoint.length-1);
      }
      return endpoint;
    });
  }

  public async fetch(path: string, body: any): Promise<any> {
    super.endpoint = this.endpoints[Math.floor(Math.random() * this.endpoints.length)];
    return super.fetch(path, body);
  }
}
