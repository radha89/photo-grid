import { useEffect } from "react";

export const useMountEffect = (fn: any) =>
  useEffect(() => {
    fn();

    /*
        Disabling this rule below is not an ideal fix. It clears es-lint warning for
        scenarios where a function only needs to be called when a component has 
        mounted (i.e. no dependencies in array)
    */

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
