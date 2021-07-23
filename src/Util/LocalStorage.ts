import { useState } from "react";

export function useLState(initial: string, path: string) {
  const prev = window.localStorage.getItem(path);
  const [val, setVal] = useState(prev ? prev : initial);
  return [
    val,
    function (newVal: string) {
      window.localStorage.setItem(path, newVal);
      setVal(newVal);
    },
  ] as [string, (newVal: string) => void];
}
