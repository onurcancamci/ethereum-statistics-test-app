import React from "react";
import { ctx } from "../Util/Utils";
import { Load } from "./Load";

export function Balance(props: { address: string }) {
  const c = ctx();
  return <Load p={c.web3.eth.getBalance(props.address)} />;
}
