import { useMemo } from "react";

const usePageToHide = () => {
  return useMemo(() => ["profile", "wallet", "categories"], []);
};

export default usePageToHide;
