import { useEffect } from "react";
import { OverlayScrollbars } from "overlayscrollbars";

import "overlayscrollbars/overlayscrollbars.css";

const CustomScrollbar = () => {
  useEffect(() => {
    OverlayScrollbars(document.body, { scrollbars: { theme: "os-theme-light" } });
  }, []);

  return null;
};

export default CustomScrollbar;
