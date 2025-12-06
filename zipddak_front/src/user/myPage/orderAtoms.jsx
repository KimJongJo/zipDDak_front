import { atomWithStorage, createJSONStorage } from "jotai/utils";

export const deliveryGroupsAtom = atomWithStorage(
  "deliveryGroups",
  [],
  createJSONStorage(() => sessionStorage)
);
