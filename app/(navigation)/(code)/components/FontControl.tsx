import { useAtom } from "jotai";
import React, { useState } from "react";
import ControlContainer from "./ControlContainer";
import { Select, SelectContent, SelectItem, SelectItemText, SelectTrigger, SelectValue } from "@/components/select";
import { fontAtom, FONTS } from "../store/font";
import useHotkeys from "../../../../utils/useHotkeys";
import titleize from "titleize";
import { themeFontAtom } from "../store/themes";

const FontControl: React.FC = () => {
  const [font, setFont] = useAtom(fontAtom);
  const [themeFont] = useAtom(themeFontAtom);
  const [isOpen, setOpen] = useState(false);

  useHotkeys("t", (event) => {
    event.preventDefault();
    if (!isOpen) {
      setOpen(true);
    }
  });

  return (
    <ControlContainer title="字体">
      <Select
        open={isOpen}
        onOpenChange={(open) => setOpen(open)}
        value={themeFont}
        onValueChange={(newFont) => {
          setFont(newFont as (typeof FONTS)[number]);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
          {font === "theme" ? "(主题)" : ""}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="theme">
            <SelectItemText>跟随主题</SelectItemText>
          </SelectItem>
          {FONTS.map((fontName) => (
            <SelectItem key={fontName} value={fontName}>
              <SelectItemText>{titleize(fontName).replace("-", " ")}</SelectItemText>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ControlContainer>
  );
};

export default FontControl;
