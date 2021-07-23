import {
  Card,
  CardContent,
  Grid,
  FormControl,
  Button,
  TextField,
  Select,
  List,
  ListItem,
} from "@material-ui/core";
import React, { useState } from "react";
import {
  ContractBase,
  IContractFunction,
  IEventResult,
  ISendResult,
} from "../Util/Contract";
import { contracts } from "../Util/Init";
import { ctx } from "../Util/Utils";
import { ContractInput } from "./ContractInput";
import { EthField } from "./EthField";
import { EventCard } from "./EventCard";
import { Load } from "./Load";

export function ContractFunctionCard(props: {
  fn: IContractFunction;
  contract: ContractBase;
}) {
  const [result, setResult] = useState(null as any as ISendResult);
  const [cresult, setCresult] = useState(null as any as string);

  const isSend =
    props.fn.stateMutability === "payable" ||
    props.fn.stateMutability === "nonpayable";
  const refs = [] as any[];
  const isPayable = props.fn.stateMutability === "payable";

  const ethRef = React.createRef<any>();

  function getRef(id: string) {
    const r = React.createRef();
    refs.push([id, r]);
    return r;
  }

  function getForm() {
    const form: Record<string, any> = {};
    for (const ref of refs) {
      form[ref[0]] = ref[1].current.value;
    }
    return form;
  }

  function eventsToArr(evs: Record<string, IEventResult | IEventResult[]>) {
    const arr = [] as IEventResult[];
    for (const key in evs) {
      if (Array.isArray(evs[key])) {
        arr.push(...(evs[key] as any));
      } else {
        arr.push(evs[key] as any);
      }
    }
    return arr;
  }

  function handleExecute() {
    const args = [];
    const form = getForm();
    for (const inp of props.fn.inputs) {
      args.push(form[inp.name]);
    }
    if (isSend) {
      props.contract
        .send(
          props.fn.name,
          {
            from: ctx().ethereum.selectedAddress,
            value: isPayable ? (ethRef!.current.value as any) : 0,
          },
          ...args,
        )
        .then((r: any) => {
          console.log(r);
          setResult(r);
        });
    } else {
      props.contract
        .call(
          props.fn.name,
          {
            from: ctx().ethereum.selectedAddress,
          },
          ...args,
        )
        .then((r: any) => {
          setCresult(r);
        });
    }
  }

  return (
    <Card style={{ backgroundColor: "#f5f5f5" }}>
      <CardContent>
        <b>{props.fn.name}</b>
      </CardContent>
      <CardContent>Inputs:</CardContent>
      <CardContent>
        <FormControl>
          <Grid container>
            {props.fn.inputs.map((i) => (
              <Grid item xs={12} key={i.name}>
                <ContractInput
                  input={i}
                  outRef={getRef(i.name)}
                  contract={props.contract}
                  fn={props.fn}
                />
              </Grid>
            ))}
            {isPayable ? (
              <Grid item xs={12}>
                <EthField outRef={ethRef} />
              </Grid>
            ) : (
              <></>
            )}
            <Grid item style={{ marginTop: "20px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleExecute}
              >
                {isSend ? "Send" : "Call"}
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </CardContent>

      {!isSend ? (
        <>
          <CardContent>Outputs:</CardContent>
          <CardContent>{cresult}</CardContent>
        </>
      ) : (
        <>
          <CardContent>Events:</CardContent>
          <CardContent>
            <List style={{ maxHeight: "300px", overflow: "auto" }}>
              {result != null ? (
                eventsToArr(result.events).map((e, i) => (
                  <EventCard
                    key={i}
                    event={e}
                    abi={
                      props.contract.json.abi.find(
                        (eb) => eb.type === "event" && eb.name === e.event,
                      )! as any
                    }
                  />
                ))
              ) : (
                <></>
              )}
            </List>
          </CardContent>
        </>
      )}
    </Card>
  );
}
