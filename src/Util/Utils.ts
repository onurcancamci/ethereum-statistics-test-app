import Web3 from "web3";

import {
  ProviderMessage,
  ProviderRpcError,
  ProviderConnectInfo,
  RequestArguments,
} from "hardhat/types";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ethereum: Ethereumish;
    web3: Web3;
  }
}

export interface EthereumEvent {
  connect: ProviderConnectInfo;
  disconnect: ProviderRpcError;
  accountsChanged: Array<string>;
  chainChanged: string;
  message: ProviderMessage;
}

type EventKeys = keyof EthereumEvent;
type EventHandler<K extends EventKeys> = (event: EthereumEvent[K]) => void;

export interface Ethereumish {
  autoRefreshOnNetworkChange: boolean;
  chainId: string;
  isMetaMask?: boolean;
  isStatus?: boolean;
  networkVersion: string;
  selectedAddress: any;

  on<K extends EventKeys>(event: K, eventHandler: EventHandler<K>): void;
  enable(): Promise<any>;
  request: (request: { method: string; params?: Array<any> }) => Promise<any>;

  send?: (
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void,
  ) => void;
  sendAsync: (request: RequestArguments) => Promise<unknown>;
}

export interface IContext {
  web3: Web3;
  web3Global: Web3;
  ethereum: Ethereumish;
}

let gctx: IContext = null as any;

export async function prepCtx() {
  window.web3 = new Web3(window.ethereum);
  //await window.ethereum.enable();
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const web3 = window.web3;
  const web3Global = new Web3(
    new Web3.providers.HttpProvider("http://localhost:7545"),
  );
  gctx = { web3, web3Global, ethereum: window.ethereum };
}

export function ctx() {
  return gctx;
}

export async function getAbi(name: string) {
  return await fetch(`http://localhost:5000/contracts/${name}.json`).then((r) =>
    r.json(),
  );
}

export async function getContractList() {
  return await fetch(`http://localhost:5000/list/`).then((r) => r.json());
}

export function shortenAddress(a: string) {
  return `${a.substr(0, 8)}...${a.substr(a.length - 8)}`;
}
