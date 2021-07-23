import React from "react";
import { Button } from "@material-ui/core";
import { Accounts } from "../Util/Accounts";

export function AccountsBtn() {
  async function logAccounts() {
    await Accounts.GetAccounts();
  }

  return (
    <Button color="primary" onClick={logAccounts}>
      Accounts
    </Button>
  );
}
