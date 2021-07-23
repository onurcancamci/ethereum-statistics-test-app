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
import { IContractEvent, IContractIO, IEventResult } from "../Util/Contract";

export function EventCard(props: { event: IEventResult; abi: IContractEvent }) {
  const fields = [] as [IContractIO, any][];

  for (const inp of props.abi.inputs) {
    fields.push([inp, props.event.returnValues[inp.name]]);
  }

  return (
    <>
      <Card>
        <CardContent>{props.event.event}</CardContent>
        <CardContent>
          <Grid container>
            {fields.map((i) => (
              <Grid item xs={12} key={i[0].name}>
                <TextField
                  InputProps={{ readOnly: true }}
                  label={i[0].name}
                  defaultValue={i[1]}
                  fullWidth={true}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
