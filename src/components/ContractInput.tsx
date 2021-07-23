import {
  Card,
  CardContent,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Box,
} from "@material-ui/core";
import React, { useState } from "react";
import {
  ContractBase,
  ContractIOType,
  IContractFunction,
  IContractIO,
  IContractIOType,
} from "../Util/Contract";
import { allAddresses, balances, contracts } from "../Util/Init";
import { useLState } from "../Util/LocalStorage";
import { ctx, shortenAddress } from "../Util/Utils";
import { EthField } from "./EthField";
import { Load } from "./Load";

export function ContractInput(props: {
  input: IContractIO;
  outRef: React.Ref<any>;
  contract: ContractBase;
  fn: IContractFunction;
}) {
  const [val, setVal] = useLState(
    "",
    `${props.contract.address}/${props.fn.name}/${props.input.name}`,
  );

  const c = ctx();
  const ty = ContractIOType(props.input.type);

  const handleChange = (
    event: React.ChangeEvent<{ value: unknown }> | string,
  ) => {
    setVal(typeof event === "string" ? event : (event.target.value as string));
  };

  if (ty === "address") {
    return (
      <>
        <InputLabel id={`${props.input.name}-label`}>
          {props.input.name}
        </InputLabel>
        <Select
          labelId={`${props.input.name}-label`}
          value={val}
          onChange={handleChange}
          fullWidth={true}
          inputRef={props.outRef}
        >
          {allAddresses.map((a) => (
            <MenuItem key={a} value={a}>
              {a} -{" "}
              <Box display="inline" color="warning.main">
                &nbsp;{balances[a]}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </>
    );
  } else if (props.input.type === "uint256") {
    return (
      <>
        <EthField
          label={props.input.name}
          onChange={handleChange}
          outRef={props.outRef}
        />
      </>
    );
  } else {
    return (
      <>
        <TextField
          label={props.input.name}
          onChange={handleChange}
          fullWidth={true}
          value={val}
          inputRef={props.outRef}
        />
      </>
    );
  }
}
