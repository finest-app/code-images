"use client";
import { useEffect } from "react";
import getWasm from "shiki/wasm";
import { highlighterAtom } from "./store";
import { useAtom } from "jotai";

import { shikiTheme } from "./store/themes";

import Frame from "./components/Frame";
import Controls from "./components/Controls";
import FrameContextStore from "./store/FrameContextStore";

import styles from "./code.module.css";
import NoSSR from "./components/NoSSR";

import { Highlighter, createHighlighterCore } from "shiki";
import { LANGUAGES } from "./util/languages";

import tailwindLight from "./assets/tailwind/light.json";
import tailwindDark from "./assets/tailwind/dark.json";
import ExportButton from "./components/ExportButton";
import { NavigationActions } from "@/components/navigation";
import { InfoDialog } from "./components/InfoDialog";
import FormatButton from "./components/FormatCodeButton";
import CustomScrollbar from "./components/CustomScrollbar";

export function Code() {
  const [highlighter, setHighlighter] = useAtom(highlighterAtom);

  useEffect(() => {
    createHighlighterCore({
      themes: [shikiTheme, tailwindLight, tailwindDark],
      langs: [LANGUAGES.javascript.src(), LANGUAGES.tsx.src(), LANGUAGES.swift.src(), LANGUAGES.python.src()],
      loadWasm: getWasm,
    }).then((highlighter) => {
      setHighlighter(highlighter as Highlighter);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <CustomScrollbar />
      <FrameContextStore>
        <NavigationActions>
          <InfoDialog />
          <FormatButton />
          <ExportButton />
        </NavigationActions>
        <div className={styles.app}>
          <NoSSR>
            {highlighter && <Frame />}
            <Controls />
          </NoSSR>
        </div>
      </FrameContextStore>
    </>
  );
}
