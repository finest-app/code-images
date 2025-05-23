import { atomWithHash } from "jotai-location";

export const FONTS = ["jetbrains-mono", "geist-mono", "ibm-plex-mono", "fira-code", "soehne-mono"] as const;

export type Font = (typeof FONTS)[number] | "theme";

const fontAtom = atomWithHash<Font>("font", "theme");

export { fontAtom };
