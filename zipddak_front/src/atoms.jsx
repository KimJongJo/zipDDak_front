import { atomWithStorage, createJSONStorage } from "jotai/utils";

export const initUser = { username: "", name: "", nickname: "", role: "", expert: "", profile: "" };

export const userAtom = atomWithStorage(
    "user",
    initUser,
    createJSONStorage(() => sessionStorage),
);

export const tokenAtom = atomWithStorage(
    "token",
    null,
    createJSONStorage(() => sessionStorage),
);

export const fcmTokenAtom = atomWithStorage(
    "fcmToken",
    null,
    createJSONStorage(() => sessionStorage),
);

export const alarmsAtom = atomWithStorage(
    "alarms",
    [],
    createJSONStorage(() => sessionStorage),
);
