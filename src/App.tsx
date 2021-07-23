import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { AccountsBtn } from "./components/AccountsBtn";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { ExampleCoinPage } from "./pages/ExampleCoinPage";
import { ctx, getContractList, prepCtx } from "./Util/Utils";
import { contracts, contractsList, Init } from "./Util/Init";
import { ContractFunctionCard } from "./components/ContractFunctionCard";
import { Grid } from "@material-ui/core";
import { IContractFunction } from "./Util/Contract";
import { ContractPage } from "./pages/ContractPage";
import { useLState } from "./Util/LocalStorage";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function App() {
  const classes = useStyles();
  const [st, setSt] = useState({
    loaded: false,
    index: window.localStorage.getItem("main-tab-index")
      ? parseInt(window.localStorage.getItem("main-tab-index")!)
      : 0,
  });

  useEffect(() => {
    setSt({ loaded: false, index: st.index });

    Init().then(() => {
      setSt({ loaded: true, index: st.index });
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSt({ ...st, index: newValue });
    window.localStorage.setItem("main-tab-index", newValue.toString());
  };

  return (
    <div>
      {st.loaded ? (
        <div>
          <AppBar position="static">
            <Tabs value={st.index} onChange={handleChange}>
              {contractsList.map((cn) => (
                <Tab key={cn} label={cn} />
              ))}
            </Tabs>
          </AppBar>
          {contractsList.map((cn, i) => (
            <TabPanel key={cn} index={i} value={st.index}>
              <ContractPage name={cn} />
            </TabPanel>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
