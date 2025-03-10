import { useMemo } from "react";

const usePageToHide = () => {
  return useMemo(() => ["profile", "categories"], []);
};

export default usePageToHide;
