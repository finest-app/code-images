import React, { FocusEventHandler, FormEventHandler, forwardRef, KeyboardEventHandler, useEffect, useRef } from "react";
import classNames from "classnames";
import { useAtomValue, useSetAtom } from "jotai";
import { createPlainShiki } from "plain-shiki";
import { BundledTheme, type BundledLanguage } from "shiki";
import { mergeRefs } from "react-merge-refs";

import { highlightedLinesAtom, highlighterAtom, loadingLanguageAtom } from "../store";
import { darkModeAtom, themeAtom } from "../store/themes";
import { Language, LANGUAGES } from "../util/languages";

import styles from "./Editor.module.css";

type PropTypes = {
  selectedLanguage: Language | null;
  code: string;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
  onFocus: FocusEventHandler;
  onInput: FormEventHandler<HTMLDivElement>;
};

const HighlightedCode = forwardRef<HTMLDivElement, PropTypes>(
  ({ selectedLanguage, code, onKeyDown, onFocus, onInput }, contentRef) => {
    const highlighter = useAtomValue(highlighterAtom);
    const setIsLoadingLanguage = useSetAtom(loadingLanguageAtom);
    const highlightedLines = useAtomValue(highlightedLinesAtom);
    const darkMode = useAtomValue(darkModeAtom);
    const theme = useAtomValue(themeAtom);
    const themeName = theme.id === "tailwind" ? (darkMode ? "tailwind-dark" : "tailwind-light") : "css-variables";

    const content = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (content.current) {
        content.current.textContent = code;
      }
    }, [code]);

    useEffect(() => {
      let dispose: Function | null = null;

      const generateHighlightedHtml = async () => {
        if (!highlighter || !selectedLanguage || selectedLanguage === LANGUAGES.plaintext) {
          return code.replace(/[\u00A0-\u9999<>\&]/g, (i) => `&#${i.charCodeAt(0)};`);
        }

        const loadedLanguages = highlighter.getLoadedLanguages() || [];
        const hasLoadedLanguage = loadedLanguages.includes(selectedLanguage.name.toLowerCase());

        if (!hasLoadedLanguage && selectedLanguage.src) {
          setIsLoadingLanguage(true);
          await highlighter.loadLanguage(selectedLanguage.src);
          setIsLoadingLanguage(false);
        }

        let lang = selectedLanguage.name.toLowerCase();
        if (lang === "typescript") {
          lang = "tsx";
        }

        // highlighter.codeToHtml(code, {
        //   lang: lang,
        //   theme: themeName,
        //   transformers: [
        //     {
        //       line(node, line) {
        //         node.properties["data-line"] = line;
        //         if (highlightedLines.includes(line)) this.addClassToHast(node, "highlighted-line");
        //       },
        //     },
        //   ],
        // });

        if (content.current === null) {
          throw new Error("content.current is null");
        }

        const plainShiki = createPlainShiki(highlighter).mount(content.current, {
          lang: lang as BundledLanguage,
          themes: {
            light: themeName as BundledTheme,
            dark: themeName as BundledTheme,
          },
        });

        dispose = plainShiki.dispose;
      };

      generateHighlightedHtml();

      return () => {
        dispose && dispose();
      };
    }, [code, selectedLanguage, highlighter, setIsLoadingLanguage, highlightedLines, theme, themeName]);

    return (
      <div
        ref={mergeRefs([content, contentRef])}
        contentEditable="plaintext-only"
        className={classNames(styles.formatted, selectedLanguage === LANGUAGES.plaintext && styles.plainText)}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onInput={onInput}
      />
    );
  },
);

HighlightedCode.displayName = "HighlightedCode";

export default HighlightedCode;
