import Web3 from "web3";
import { ctx } from "./Utils";

export class Accounts {
  static async GetAccounts() {
    const c = ctx();
    //console.log(await c.web3.eth.getBalance(c.ethereum.selectedAddress));
  }
}
