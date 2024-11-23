"use client";

import { cn } from "@/utils/cn";
import { Button } from "./button";
import icon from "@/app/icon.png";

export function Navigation() {
  return (
    <nav className="flex items-center gap-3 h-[50px] pl-4 pr-5 text-white w-full fixed z-10">
      <Button variant="transparent" className="py-1 pl-1 pr-2 gap-2">
        <img alt="Code Images Icon" src={icon.src} className="size-6" width={24} height={24} />
        <span className="text-[15px] font-medium text-gray-12">Code Images</span>
      </Button>
    </nav>
  );
}

export function NavigationActions({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "h-[50px] flex items-center justify-end fixed top-0 right-scrollbar-offset gap-2 z-10 left-44",
        className,
      )}
    >
      {children}
    </div>
  );
}
