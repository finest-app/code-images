import React, {
  useCallback,
  KeyboardEventHandler,
  FormEventHandler,
  FocusEventHandler,
  useRef,
  useState,
  useEffect,
} from "react";
import styles from "./Editor.module.css";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { codeAtom, isCodeExampleAtom, selectedLanguageAtom } from "../store/code";
import {
  THEMES,
  themeAtom,
  themeCSSAtom,
  themeFontAtom,
  themeLineNumbersAtom,
  unlockedThemesAtom,
} from "../store/themes";
import useHotkeys from "../../../../utils/useHotkeys";
import HighlightedCode from "./HighlightedCode";
import classNames from "classnames";
import { derivedFlashMessageAtom } from "../store/flash";
import { highlightedLinesAtom, showLineNumbersAtom } from "../store";
import { LANGUAGES } from "../util/languages";

function Editor() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [code, setCode] = useAtom(codeAtom);
  const selectedLanguage = useAtomValue(selectedLanguageAtom);
  const [themeCSS] = useAtom(themeCSSAtom);
  const [isCodeExample] = useAtom(isCodeExampleAtom);
  const [themeFont] = useAtom(themeFontAtom);
  const [theme, setTheme] = useAtom(themeAtom);
  const [unlockedThemes, setUnlockedThemes] = useAtom(unlockedThemesAtom);
  const setFlashMessage = useSetAtom(derivedFlashMessageAtom);
  const setHighlightedLines = useSetAtom(highlightedLinesAtom);
  const [isHighlightingLines, setIsHighlightingLines] = useState(false);
  const [showLineNumbers] = useAtom(themeLineNumbersAtom);
  const numberOfLines = (code.match(/\n/g) || []).length;

  useHotkeys("f", (event) => {
    event.preventDefault();
    contentRef.current?.focus();
  });

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>((event) => {
    const textarea = contentRef.current!;
    switch (event.key) {
      case "Tab":
        event.preventDefault();
        document.execCommand("insertText", false, "  ");
        break;
      case "Escape":
        event.preventDefault();
        textarea.blur();
        break;
      case "Enter":
        event.preventDefault();
        document.execCommand("insertLineBreak");

        break;
    }
  }, []);

  const handleChange = useCallback<FormEventHandler<HTMLDivElement>>(
    (event) => {
      const code = (event.target as HTMLElement).textContent as string;

      if (code.includes("🐰") && theme.id !== THEMES.rabbit.id) {
        if (!unlockedThemes.includes(THEMES.rabbit.id)) {
          setUnlockedThemes([...unlockedThemes, THEMES.rabbit.id]);
        }
        setTheme(THEMES.rabbit);

        window.utools
          ? window.utools.dbStorage.setItem("codeTheme", THEMES.rabbit.id)
          : localStorage.setItem("codeTheme", THEMES.rabbit.id);

        setFlashMessage({
          message: "Evil Rabbit 主题已解锁",
          variant: "unlock",
          timeout: 2000,
          icon: React.createElement(THEMES.rabbit.icon || "", { style: { color: "black" } }),
        });
      }
      setCode(code);
    },
    [setCode, setTheme, setFlashMessage, setUnlockedThemes, unlockedThemes, theme.id],
  );

  const handleFocus = useCallback<FocusEventHandler>(
    (event) => {
      if (isCodeExample && contentRef.current) {
        window.getSelection()?.selectAllChildren(event.target);
      }
    },
    [isCodeExample],
  );

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const lineNumber = (target.closest("[data-line]") as HTMLElement)?.dataset?.line;
      if (lineNumber && isHighlightingLines) {
        setHighlightedLines((prev) => {
          const line = Number(lineNumber);
          if (prev.includes(line)) {
            return prev.filter((l) => l !== line);
          } else {
            return [...prev, line];
          }
        });
      }
    };

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [setHighlightedLines, isHighlightingLines]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Alt") {
        setIsHighlightingLines(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Alt") {
        setIsHighlightingLines(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div
      className={classNames(
        styles.editor,
        themeFont === "geist-mono"
          ? styles.geistMono
          : themeFont === "ibm-plex-mono"
            ? styles.ibmPlexMono
            : themeFont === "fira-code"
              ? styles.firaCode
              : themeFont === "soehne-mono"
                ? styles.soehneMono
                : styles.jetBrainsMono,
        isHighlightingLines && styles.isHighlightingLines,
        showLineNumbers &&
          selectedLanguage !== LANGUAGES.plaintext && [
            styles.showLineNumbers,
            numberOfLines > 8 && styles.showLineNumbersLarge,
          ],
      )}
      style={{ "--editor-padding": "16px 16px 21px 16px", ...themeCSS } as React.CSSProperties}
    >
      <HighlightedCode
        ref={contentRef}
        selectedLanguage={selectedLanguage}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onInput={handleChange}
      />
    </div>
  );
}

export default Editor;
