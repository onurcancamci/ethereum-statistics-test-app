import React from "react";
import { Button, Grid } from "@material-ui/core";
import { ContractFunctionCard } from "../components/ContractFunctionCard";
import { IContractFunction } from "../Util/Contract";
import { contracts } from "../Util/Init";

export function ContractPage(props: { name: string }) {
  return (
    <Grid container spacing={3}>
      {contracts.raw[props.name].json.abi
        .filter((abi) => abi.type === "function")
        .map((abi) => (
          <Grid item xs={12} md={6} key={(abi as any).name}>
            <ContractFunctionCard
              fn={abi as IContractFunction}
              contract={contracts.raw[props.name]}
            />
          </Grid>
        ))}
    </Grid>
  );
}
