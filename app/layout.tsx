import { Inter } from "next/font/google";
import "./globals.css";
import cn from "classnames";
import { TooltipProvider } from "@/components/tooltip";
import { Viewport } from "next";
import { Toaster } from "@/components/toast";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const viewport: Viewport = {
  themeColor: "#181818",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <TooltipProvider>
        <body className={cn("isolate", inter.className)}>
          {children}
          <Toaster position="top-center" offset={70} duration={2000} />
        </body>
      </TooltipProvider>
    </html>
  );
}
