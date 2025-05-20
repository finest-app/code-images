import { Button } from "@/components/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogDescription } from "@/components/dialog";
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
      <DialogDescription />
      <DialogContent size="large">
        <div className="flex gap-8">
          <div className="flex flex-col gap-3 flex-1 text-[13px] text-gray-11 leading-relaxed">
            <DialogTitle>关于</DialogTitle>
            <p>代码截图是一款专业的代码展示工具，能够将源代码转换成精美的图片，让代码分享更加优雅直观。</p>
            <p>支持多种编程语言，内置多种主题，提供暗色模式切换、背景开关、边距调整等功能。</p>
            <p>点击右上角的【复制图片】按钮，可以将截图复制到剪贴板, 粘贴到任何支持图片的应用中。</p>
            <p>点击【复制图片】按钮右侧的图标，打开导出菜单，可以选择导出 PNG 或 SVG 格式的截图和调整导出质量。</p>
            <p className="text-gray-12 mt-auto">
              本工具基于效率工具{" "}
              <a className="text-brand" href="https://www.raycast.com/" target="_blank">
                Raycast
              </a>{" "}
              的开源项目{" "}
              <a className="text-brand" href="https://github.com/raycast/ray-so" target="_blank">
                ray.so
              </a>{" "}
              开发。
            </p>
            {/* <h2 className="text-base font-medium text-gray-12">Contribute</h2>
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
            </p> */}
            {/* <SocialFooter referral="code-image" /> */}
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
              <Shortcut keys={["N"]}>切换行号</Shortcut>
              <Shortcut keys={["P"]}>切换边距</Shortcut>
              <Shortcut keys={["L"]}>选择语言</Shortcut>
              <Shortcut keys={["⌥", "click"]}>突出显示行</Shortcut>
              <Shortcut keys={["⌥", "shift", "F"]}>格式化代码</Shortcut>
              <Shortcut keys={["⌘", "K"]}>切换导出菜单</Shortcut>
              <Shortcut keys={["⌘", "S"]}>导出 PNG</Shortcut>
              <Shortcut keys={["⌘", "⇧", "S"]}>导出 SVG</Shortcut>
              {pngClipboardSupported && <Shortcut keys={["⌘", "C"]}>复制图片</Shortcut>}
              <Shortcut keys={["?"]}>查看快捷键</Shortcut>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
