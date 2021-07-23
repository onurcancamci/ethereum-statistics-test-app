import Web3 from "web3";
import { ContractBase } from "./Contract";
import { ctx, getAbi } from "./Utils";

export class ExampleCoin extends ContractBase {
  async mintToMe(amount: number) {
    const c = ctx();
    return this.send(
      "mint",
      { from: c.ethereum.selectedAddress },
      c.ethereum.selectedAddress,
      amount | 0,
    );
  }

  async balanceOf(address: string) {
    const c = ctx();
    return this.call(
      "balanceOf",
      { from: c.ethereum.selectedAddress },
      address,
    );
  }
}
