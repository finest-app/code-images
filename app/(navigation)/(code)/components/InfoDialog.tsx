import { Button } from "@/components/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/dialog";
import { Info02Icon } from "@raycast/icons";
import { Shortcut } from "@/components/kbd";
import usePngClipboardSupported from "../util/usePngClipboardSupported";
import { useCallback, useState } from "react";
import useHotkeys from "@/utils/useHotkeys";
import { SocialFooter } from "@/components/social-footer";

export function InfoDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);
  const pngClipboardSupported = usePngClipboardSupported();

  useHotkeys("shift+/", toggleOpen);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="transparent" className="hidden md:flex gap-2">
          <Info02Icon />
          关于
        </Button>
      </DialogTrigger>
      <DialogContent size="large">
        <div className="flex gap-8">
          <div className="flex flex-col gap-3 flex-1 text-[13px] text-gray-11 leading-relaxed">
            <DialogTitle>关于</DialogTitle>
            <p>Code Images by Raycast is a tool to create beautiful screenshots of your code.</p>
            <p>
              Pick a theme from a range of syntax colors and backgrounds, the language of your code and choose between
              light or dark mode.
            </p>
            <p>
              Customize the padding and when you’re ready, click export image in the top-right corner to save the image
              as a png, svg or share a link to your code.
            </p>
            <p>You can also change the image resolution in the export menu.</p>
            <h2 className="text-base font-medium text-gray-12">Contribute</h2>
            <p>
              The project is Open Source and{" "}
              <a href="https://github.com/raycast/ray-so" className="text-gray-12 underline underline-offset-2">
                available on Github
              </a>
              .
            </p>
            <p>
              If you have any questions or feedback, please write to us on{" "}
              <a href="https://x.com/raycastapp" className="text-gray-12 underline underline-offset-2">
                𝕏
              </a>{" "}
              or{" "}
              <a href="mailto:feedback+rayso@raycast.com" className="text-gray-12 underline underline-offset-2">
                send us an email
              </a>
              .
            </p>
            <SocialFooter referral="code-image" />
          </div>

          <div className="w-px h-full bg-gray-a3" />

          <div className="flex-1 flex flex-col gap-2">
            <h2 className="font-medium -mt-[3px]">快捷键</h2>
            <div className="flex flex-col gap-4">
              <Shortcut keys={["F"]}>聚焦文本编辑器</Shortcut>
              <Shortcut keys={["Esc"]}>取消聚焦文本编辑器</Shortcut>
              <Shortcut keys={["C"]}>切换主题</Shortcut>
              <Shortcut keys={["B"]}>切换背景</Shortcut>
              <Shortcut keys={["D"]}>切换暗色模式</Shortcut>
              <Shortcut keys={["P"]}>切换边距</Shortcut>
              <Shortcut keys={["L"]}>选择语言</Shortcut>
              <Shortcut keys={["⌥", "click"]}>突出显示行</Shortcut>
              <Shortcut keys={["⌥", "shift", "F"]}>格式化代码</Shortcut>
              <Shortcut keys={["⌘", "K"]}>切换导出菜单</Shortcut>
              <Shortcut keys={["⌘", "S"]}>导出 PNG</Shortcut>
              <Shortcut keys={["⌘", "⇧", "S"]}>导出 SVG</Shortcut>
              {pngClipboardSupported && <Shortcut keys={["⌘", "C"]}>复制图片</Shortcut>}
              <Shortcut keys={["⌘", "⇧", "C"]}>复制链接</Shortcut>
              <Shortcut keys={["?"]}>查看快捷键</Shortcut>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
