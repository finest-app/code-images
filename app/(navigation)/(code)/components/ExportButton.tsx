import React, { MouseEventHandler, useContext, useState } from "react";

import ImageIcon from "../assets/icons/image-16.svg";
import ImageSVGIcon from "../assets/icons/image-svg-16.svg";
import LinkIcon from "../assets/icons/link-16.svg";
import ChevronDownIcon from "../assets/icons/chevron-down-16.svg";
import ClipboardIcon from "../assets/icons/clipboard-16.svg";
import ArrowsExpandingIcon from "../assets/icons/arrows-expanding-16.svg";

import { FrameContext } from "../store/FrameContextStore";
import { derivedFlashMessageAtom, flashShownAtom } from "../store/flash";
import { fileNameAtom } from "../store";
import downloadBlob from "../util/downloadBlob";
import download from "../util/download";
import { toPng, toSvg, toBlob } from "../lib/image";

import useHotkeys from "../../../../utils/useHotkeys";
import usePngClipboardSupported from "../util/usePngClipboardSupported";
import { useAtom, useAtomValue } from "jotai";
import { EXPORT_SIZE_OPTIONS, SIZE_LABELS, exportSizeAtom } from "../store/image";
import { autoDetectLanguageAtom, selectedLanguageAtom } from "../store/code";
import { LANGUAGES } from "../util/languages";
import { ButtonGroup } from "@/components/button-group";
import { Button } from "@/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { DownloadIcon } from "@raycast/icons";
import { Kbd, Kbds } from "@/components/kbd";

const ExportButton: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pngClipboardSupported = usePngClipboardSupported();
  const frameContext = useContext(FrameContext);
  const [, setFlashMessage] = useAtom(derivedFlashMessageAtom);
  const [, setFlashShown] = useAtom(flashShownAtom);
  const customFileName = useAtomValue(fileNameAtom);
  const fileName = customFileName.replaceAll(" ", "-") || "ray-so-export";
  const [exportSize, setExportSize] = useAtom(exportSizeAtom);
  const selectedLanguage = useAtomValue(selectedLanguageAtom);
  const autoDetectLanguage = useAtomValue(autoDetectLanguageAtom);

  const savePng = async () => {
    if (!frameContext?.current) {
      throw new Error("Couldn't find a frame to export");
    }

    setFlashMessage({ icon: <ImageIcon />, message: "正在导出 PNG" });

    const blob = await toBlob(frameContext.current, {
      pixelRatio: exportSize,
    });

    if (blob === null) {
      throw new Error("expected toBlob to return a blob");
    }

    downloadBlob(blob, `${fileName}.png`);

    setFlashShown(false);
  };

  const copyPng = async () => {
    setFlashMessage({ icon: <ClipboardIcon />, message: "正在复制 PNG" });
    if (!frameContext?.current) {
      throw new Error("Couldn't find a frame to export");
    }

    const blob = await toBlob(frameContext.current, {
      pixelRatio: exportSize,
    });

    if (!blob) {
      throw new Error("expected toBlob to return a blob");
    }

    if (window.utools) {
      const uint8Array = new Uint8Array(await blob.arrayBuffer());

      window.utools.copyImage(uint8Array);
    } else {
      const clipboardItem = new ClipboardItem({
        "image/png": blob,
      });

      await navigator.clipboard.write([clipboardItem]);
    }

    setFlashMessage({ icon: <ClipboardIcon />, message: "PNG 已复制到剪贴板！", timeout: 1000 });
  };

  const saveSvg = async () => {
    if (!frameContext?.current) {
      throw new Error("Couldn't find a frame to export");
    }

    setFlashMessage({ icon: <ImageIcon />, message: "正在导出 SVG" });

    const dataUrl = await toSvg(frameContext.current);
    download(dataUrl, `${fileName}.svg`);

    setFlashShown(false);
  };

  const dropdownHandler: (handler: () => void) => (event: Event) => void = (handler) => {
    return (event) => {
      event.preventDefault();
      handler();
      setDropdownOpen(false);
    };
  };

  const handleExportClick: MouseEventHandler = (event) => {
    event.preventDefault();

    savePng();
  };

  const handleCopyClick: MouseEventHandler = (event) => {
    event.preventDefault();

    copyPng();
  };

  // const copyUrl = async () => {
  //   setFlashMessage({ icon: <ClipboardIcon />, message: "正在复制链接" });

  //   const url = window.location.toString();
  //   let urlToCopy = url;

  //   const encodedUrl = encodeURIComponent(url);
  //   const response = await fetch(`/api/shorten-url?url=${encodedUrl}&ref=codeImage`).then((res) => res.json());

  //   if (response.link) {
  //     urlToCopy = response.link;
  //   }

  //   navigator.clipboard.writeText(urlToCopy);

  //   setFlashMessage({ icon: <ClipboardIcon />, message: "链接已复制到剪贴板！", timeout: 2000 });
  // };

  useHotkeys("ctrl+k,cmd+k", (event) => {
    event.preventDefault();
    setDropdownOpen((open) => !open);
  });

  useHotkeys("ctrl+s,cmd+s", (event) => {
    event.preventDefault();
    savePng();
  });
  useHotkeys("ctrl+c,cmd+c", (event) => {
    if (pngClipboardSupported) {
      event.preventDefault();
      copyPng();
    }
  });
  // useHotkeys("ctrl+shift+c,cmd+shift+c", (event) => {
  //   event.preventDefault();
  //   copyUrl();
  // });
  useHotkeys("ctrl+shift+s,cmd+shift+s", (event) => {
    event.preventDefault();
    saveSvg();
  });

  return (
    <>
      <Button variant="secondary" onClick={handleExportClick} aria-label="Export as PNG">
        <DownloadIcon className="size-4" />
        <span>
          下载<span className="hidden md:inline-block">图片</span>
        </span>
      </Button>
      <ButtonGroup>
        <Button onClick={handleCopyClick} variant="primary" aria-label="Copy as PNG">
          <ClipboardIcon className="size-4" />
          <span>
            复制<span className="hidden md:inline-block">图片</span>
          </span>
        </Button>
        <DropdownMenu open={dropdownOpen} onOpenChange={(open) => setDropdownOpen(open)}>
          <DropdownMenuTrigger asChild>
            <Button variant="primary" aria-label="See other export options">
              <ChevronDownIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end">
            <DropdownMenuItem onSelect={dropdownHandler(savePng)}>
              <ImageIcon />
              导出 PNG
              <Kbds>
                <Kbd>⌘</Kbd>
                <Kbd>S</Kbd>
              </Kbds>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={dropdownHandler(saveSvg)}>
              <ImageSVGIcon />
              导出 SVG
              <Kbds>
                <Kbd>⌘</Kbd>
                <Kbd>⇧</Kbd>
                <Kbd>S</Kbd>
              </Kbds>
            </DropdownMenuItem>
            {/* {pngClipboardSupported && (
              <DropdownMenuItem onSelect={dropdownHandler(copyPng)}>
                <ClipboardIcon />
                复制图片
                <Kbds>
                  <Kbd>⌘</Kbd>
                  <Kbd>C</Kbd>
                </Kbds>
              </DropdownMenuItem>
            )} */}
            {/* <DropdownMenuItem onSelect={dropdownHandler(copyUrl)}>
            <LinkIcon />
            复制链接
            <Kbds>
              <Kbd>⌘</Kbd>
              <Kbd>⇧</Kbd>
              <Kbd>C</Kbd>
            </Kbds>
          </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger value={SIZE_LABELS[exportSize]}>
                <ArrowsExpandingIcon />
                倍数
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent sideOffset={8}>
                <DropdownMenuRadioGroup value={exportSize.toString()}>
                  {EXPORT_SIZE_OPTIONS.map((size) => (
                    <DropdownMenuRadioItem key={size} value={size.toString()} onSelect={() => setExportSize(size)}>
                      {SIZE_LABELS[size]}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </>
  );
};

export default ExportButton;
