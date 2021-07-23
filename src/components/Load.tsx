import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export function Load<T>(props: { p: Promise<T> }) {
  const [val, setVal] = useState(null as any as T);
  useEffect(() => {
    props.p.then((v) => {
      setVal(v);
    });
  });

  return <>{!!val ? val : <CircularProgress />}</>;
}
