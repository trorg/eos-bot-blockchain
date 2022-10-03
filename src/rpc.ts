import { JsonRpc } from 'eosjs';
import fetch from 'node-fetch';
import randUserAgent from 'random-useragent';
import { Endpoint, RpcFetchMethod } from './interfaces';

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
    endpoints: Endpoint[],
    args: {
      fetch?: RpcFetchMethod,
    } = {}
  ) {
    if (!args.fetch) {
      args.fetch = fetch;
    }
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
