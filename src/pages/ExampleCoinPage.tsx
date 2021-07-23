import React, { useState } from "react";
import { Balance } from "../components/Balance";
import { ctx } from "../Util/Utils";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Load } from "../components/Load";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { ExampleCoin } from "../Util/ExampleCoin";
import Grid from "@material-ui/core/Grid";
import { contracts } from "../Util/Init";

export function ExampleCoinPage() {
  const [exBalance, setExBalance] = useState("-");

  const c = ctx();

  async function test() {
    console.log("test");
  }

  async function mint() {
    console.log(await contracts.ExampleCoin.mintToMe(1));
  }

  async function balanceOf() {
    const res = await contracts.ExampleCoin.balanceOf(
      c.ethereum.selectedAddress,
    );
    console.log(res, await contracts.ExampleCoin.call("minter", {}));
    setExBalance(res.toString());
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Btn</TableCell>
              <TableCell align="right">Input</TableCell>
              <TableCell align="right">Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="1">
              <TableCell component="th" scope="row">
                <Button color="primary" onClick={test}>
                  Test
                </Button>
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="center">
                <Balance address={c.ethereum.selectedAddress} />
              </TableCell>
            </TableRow>

            <TableRow key="2">
              <TableCell component="th" scope="row">
                <Button color="primary" onClick={mint}>
                  Mint
                </Button>
              </TableCell>
              <TableCell align="center">
                <Grid container>
                  <Grid item xs={12}>
                    <TextField id="standard-basic" label="Standard" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField id="standard-basic" label="Standard" />
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell align="right">
                <Balance address={c.ethereum.selectedAddress} />
              </TableCell>
            </TableRow>

            <TableRow key="3">
              <TableCell component="th" scope="row">
                <Button color="primary" onClick={balanceOf}>
                  Log Balance
                </Button>
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">{exBalance}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
