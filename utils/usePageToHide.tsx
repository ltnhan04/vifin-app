import { useMemo } from "react";

const usePageToHide = () => {
  return useMemo(
    () => ["profile", "(wallet)", "categories", "create-wallet", "[id]"],
    []
  );
};

export default usePageToHide;
