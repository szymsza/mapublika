import { atom } from "recoil";
import { MapResolution, MojeIDData } from "./types";

export const textState = atom<string>({
  key: "text",
  default: "Test",
});

export const mojeIDStorageKey = "mojeIDLoggedIn";
export const mojeIDDataState = atom<MojeIDData | null>({
  key: "mojeIDData",
  default: JSON.parse(localStorage.getItem(mojeIDStorageKey)!),
});

export const mojeIDInitializedState = atom<boolean>({
  key: "mojeIDInitialized",
  default: false,
});

export const mapResolutionState = atom<MapResolution>({
  key: "mapResolution",
  default: "regions",
});