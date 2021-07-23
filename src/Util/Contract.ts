import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { ctx, getAbi, IContext } from "./Utils";

export class ContractBase {
  wait: Promise<any>;
  _json: IContractJson | null = null;

  constructor(public name: string, public c: IContext) {
    this.wait = getAbi(name).then((abi) => {
      this._json = abi;
    });
    c = ctx();
  }

  get address(): string {
    const nets = this.json.networks;
    return nets[Object.keys(nets)[0]].address;
  }

  get json(): IContractJson {
    if (!this._json) {
      throw "Initialize Contract First";
    }
    return this._json;
  }

  get contract(): Contract {
    return new this.c.web3.eth.Contract(this.json.abi, this.address, {});
  }

  call(name: string, opts: ICallOptions, ...args: any[]) {
    return this.contract.methods[name](...args).call(opts);
  }

  send(name: string, opts: ISendOptions, ...args: any[]) {
    return this.contract.methods[name](...args).send(opts);
  }
}

export function ContractIOType(t: string): IContractIOType {
  for (const ty of ContractIOTypes) {
    if (t.startsWith(ty)) {
      return ty;
    }
  }
  return null as any;
}

export interface IEventResult {
  address: string;
  blockHash: string;
  blockNumber: number;
  event: string;
  id: string;
  logIndex: number;
  raw: {
    data: string;
    topics: any[];
  };
  returnValues: Record<string, any>;
  signature: string;
  transactionHash: string;
  transactionIndex: number;
  type: "mined";
}

export interface ISendResult {
  blockHash: string;
  blockNumber: number;
  contractAddress: null;
  cumulativeGasUsed: number;
  events: Record<string, IEventResult | IEventResult[]>;
  from: string;
  gasUsed: number;
  logsBloom: string;
  status: true;
  to: string;
  transactionHash: string;
  transactionIndex: number;
}

export type ICallOptions = { from?: string; gas?: string; gasPrice?: string };
export type ISendOptions = {
  from?: string;
  gas?: string;
  gasPrice?: string;
  value?: number;
};

export type IContractType = "constructor" | "function" | "fallback";
export type IContractStateMutability =
  | "pure"
  | "view"
  | "payable"
  | "nonpayable";

export const ContractIOTypes = <const>[
  "address",
  "tuple",
  "uint",
  "int",
  "bool",
  "data",
  "bytes",
  "fixed",
  "function",
];
export type IContractIOType = typeof ContractIOTypes[number];

export interface IContractIO {
  indexed?: boolean;
  internalType: string;
  name: string;
  type: string;
  components?: IContractIO[];
}

export interface IContractConstructor {
  inputs: IContractIO[];
  stateMutability: IContractStateMutability;
  type: "constructor";
  payable: boolean;
}

export interface IContractFunction {
  inputs: IContractIO[];
  outputs: IContractIO[];
  stateMutability: IContractStateMutability;
  type: "function" | "fallback";
  constant: boolean;
  payable: boolean;
  name: string;
}

export interface IContractEvent {
  inputs: IContractIO[];
  type: "event";
  anonymous: boolean;
  name: string;
}

export interface IContractJson {
  contractName: "ExampleCoin";
  abi: (IContractConstructor | IContractEvent | IContractFunction)[];
  metadata: string;
  bytecode: string;
  deployedBytecode: string;
  sourceMap: string;
  deployedSourceMap: string;
  source: string;
  sourcePath: string;
  ast: any;
  legacyAST: any;
  compiler: {
    name: string;
    version: string;
  };
  networks: Record<
    string,
    {
      events: {};
      links: {};
      address: string;
      transactionHash: string;
    }
  >;
  schemaVersion: string;
  updatedAt: string;
  networkType: string;
  devdoc: {
    methods: {};
  };
  userdoc: {
    methods: {};
  };
}
