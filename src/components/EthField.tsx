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
  ContractIOType,
  IContractFunction,
  IContractIO,
  IContractIOType,
} from "../Util/Contract";
import { allAddresses, balances, contracts } from "../Util/Init";
import { ctx, shortenAddress } from "../Util/Utils";
import { Load } from "./Load";

export function EthField(props: {
  outRef: React.Ref<any>;
  label?: string;
  onChange?: Function;
}) {
  const [val, setVal] = useState("0.0");
  const [decimal, setDecimal] = useState("ether");
  const [wei, setWei] = useState("0");
  const [isError, setError] = useState(false);

  const c = ctx();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setVal(event.target.value as string);
    const num = parseFloat(event.target.value as string);
    if (!isNaN(num) && num.toString() === (event.target.value as string)) {
      setWei(c.web3.utils.toWei(num.toString(), decimal as any));
      if (props.onChange) {
        props.onChange(wei);
      }
      setError(false);
    } else {
      setError(true);
    }
  };
  const handleDecimal = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDecimal(event.target.value as any);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <TextField
            label={props.label || "Ether To Send"}
            onChange={handleChange}
            fullWidth={true}
            value={val}
            error={isError}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            select
            label="Unit"
            value={decimal}
            onChange={handleDecimal}
          >
            <MenuItem value={"ether"}>Ether</MenuItem>
            <MenuItem value={"gwei"}>Gwei</MenuItem>
            <MenuItem value={"wei"}>Wei</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <TextField
        style={{ display: "none" }}
        inputRef={props.outRef}
        value={wei}
      ></TextField>
    </>
  );
}
