import type { Metadata } from "next";

import { Code } from "./code";

const title = "Create beautiful images of your code";
const description =
  "Turn your code into beautiful images. Choose from a range of syntax colors, hide or show the background, and toggle between a dark and light window.";

export const metadata: Metadata = {
  title: title,
  description: description,
  keywords: "generate, create, convert, source, code, snippet, image, picture, share, export",
};

export default function Page() {
  return <Code />;
}
