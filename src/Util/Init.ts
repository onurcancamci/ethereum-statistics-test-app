import { ContractBase } from "./Contract";
import { ExampleCoin } from "./ExampleCoin";
import { ctx, getContractList, prepCtx } from "./Utils";

export const contracts = {
  ExampleCoin: null as any as ExampleCoin,
  raw: {} as Record<string, ContractBase>,
};

export let allAddresses = [] as string[];
export let balances = {} as Record<string, string>;
export let contractsList = [] as string[];

export async function Init() {
  await prepCtx();
  const c = ctx();

  allAddresses = await c.web3Global.eth.getAccounts();
  for (const a of allAddresses) {
    balances[a] = c.web3.utils.fromWei(await c.web3Global.eth.getBalance(a));
  }

  contracts.ExampleCoin = new ExampleCoin("ExampleCoin", c);
  await contracts.ExampleCoin.wait;

  const list = await getContractList();
  contractsList = list;
  for (const name of list) {
    contracts.raw[name] = new ContractBase(name, c);
    await contracts.raw[name].wait;
  }
}
