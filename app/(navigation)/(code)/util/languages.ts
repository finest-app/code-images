export type Language = {
  name: string;
  /*
   * https://github.com/yoeo/guesslang/blob/master/guesslang/data/languages.json
   * The languageId source is from the above link
   */
  languageId?: string;
  src: () => Promise<any>;
};

export const LANGUAGES: { [index: string]: Language } = {
  shell: {
    name: "Bash",
    languageId: "sh",
    src: () => import("shiki/langs/bash.mjs"),
  },
  astro: {
    name: "Astro",
    src: () => import("shiki/langs/astro.mjs"),
  },
  cpp: {
    name: "C++",
    languageId: "cpp",
    src: () => import("shiki/langs/cpp.mjs"),
  },
  csharp: {
    name: "C#",
    languageId: "cs",
    src: () => import("shiki/langs/csharp.mjs"),
  },
  clojure: {
    name: "Clojure",
    languageId: "clj",
    src: () => import("shiki/langs/clojure.mjs"),
  },
  crystal: {
    name: "Crystal",
    src: () => import("shiki/langs/crystal.mjs"),
  },
  css: {
    name: "CSS",
    languageId: "css",
    src: () => import("shiki/langs/css.mjs"),
  },
  dart: {
    name: "Dart",
    languageId: "dart",
    src: () => import("shiki/langs/dart.mjs"),
  },
  diff: {
    name: "Diff",
    src: () => import("shiki/langs/diff.mjs"),
  },
  dockerfile: {
    name: "Docker",
    languageId: "dockerfile",
    src: () => import("shiki/langs/dockerfile.mjs"),
  },
  elm: {
    name: "Elm",
    src: () => import("shiki/langs/elm.mjs"),
  },
  elixir: {
    name: "Elixir",
    languageId: "ex",
    src: () => import("shiki/langs/elixir.mjs"),
  },
  erlang: {
    name: "Erlang",
    languageId: "erl",
    src: () => import("shiki/langs/erlang.mjs"),
  },
  gleam: {
    name: "Gleam",
    src: () => import("shiki/langs/gleam.mjs"),
  },
  graphql: {
    name: "GraphQL",
    src: () => import("shiki/langs/graphql.mjs"),
  },
  go: {
    name: "Go",
    languageId: "go",
    src: () => import("shiki/langs/go.mjs"),
  },
  haskell: {
    name: "Haskell",
    languageId: "hs",
    src: () => import("shiki/langs/haskell.mjs"),
  },
  html: {
    name: "HTML",
    languageId: "html",
    src: () => import("shiki/langs/html.mjs"),
  },
  java: {
    name: "Java",
    languageId: "java",
    src: () => import("shiki/langs/java.mjs"),
  },
  javascript: {
    name: "JavaScript",
    languageId: "js",
    src: () => import("shiki/langs/javascript.mjs"),
  },
  julia: {
    name: "Julia",
    languageId: "jl",
    src: () => import("shiki/langs/julia.mjs"),
  },
  json: {
    name: "JSON",
    languageId: "json",
    src: () => import("shiki/langs/json.mjs"),
  },
  jsx: {
    name: "JSX",
    languageId: "js",
    src: () => import("shiki/langs/jsx.mjs"),
  },
  kotlin: {
    name: "Kotlin",
    languageId: "kt",
    src: () => import("shiki/langs/kotlin.mjs"),
  },
  latex: {
    name: "LaTeX",
    languageId: "tex",
    src: () => import("shiki/langs/latex.mjs"),
  },
  lisp: {
    name: "Lisp",
    languageId: "lisp",
    src: () => import("shiki/langs/lisp.mjs"),
  },
  lua: {
    name: "Lua",
    languageId: "lua",
    src: () => import("shiki/langs/lua.mjs"),
  },
  markdown: {
    name: "Markdown",
    languageId: "md",
    src: () => import("shiki/langs/markdown.mjs"),
  },
  matlab: {
    name: "MATLAB",
    languageId: "md",
    src: () => import("shiki/langs/matlab.mjs"),
  },
  move: {
    name: "Move",
    src: () => import("shiki/langs/move.mjs"),
  },
  plaintext: {
    name: "Plaintext",
    src: () => import("shiki/langs/javascript.mjs"),
  },
  powershell: {
    name: "Powershell",
    languageId: "ps1",
    src: () => import("shiki/langs/powershell.mjs"),
  },
  objectivec: {
    name: "Objective-C",
    languageId: "mm",
    src: () => import("shiki/langs/objc.mjs"),
  },
  ocaml: {
    name: "OCaml",
    languageId: "ml",
    src: () => import("shiki/langs/ocaml.mjs"),
  },
  php: {
    name: "PHP",
    languageId: "php",
    src: () => import("shiki/langs/php.mjs"),
  },
  prisma: {
    name: "Prisma",
    src: () => import("shiki/langs/prisma.mjs"),
  },
  python: {
    name: "Python",
    languageId: "py",
    src: () => import("shiki/langs/python.mjs"),
  },
  r: {
    name: "R",
    languageId: "r",
    src: () => import("shiki/langs/r.mjs"),
  },
  ruby: {
    name: "Ruby",
    languageId: "rb",
    src: () => import("shiki/langs/ruby.mjs"),
  },
  rust: {
    name: "Rust",
    languageId: "rs",
    src: () => import("shiki/langs/rust.mjs"),
  },
  scala: {
    name: "Scala",
    languageId: "scala",
    src: () => import("shiki/langs/scala.mjs"),
  },
  scss: {
    name: "SCSS",
    languageId: "css",
    src: () => import("shiki/langs/scss.mjs"),
  },
  solidity: {
    name: "Solidity",
    src: () => import("shiki/langs/solidity.mjs"),
  },
  sql: {
    name: "SQL",
    languageId: "sql",
    src: () => import("shiki/langs/sql.mjs"),
  },
  swift: {
    name: "Swift",
    languageId: "swift",
    src: () => import("shiki/langs/swift.mjs"),
  },
  svelte: {
    name: "Svelte",
    src: () => import("shiki/langs/svelte.mjs"),
  },
  toml: {
    name: "TOML",
    languageId: "toml",
    src: () => import("shiki/langs/toml.mjs"),
  },
  typescript: {
    name: "TypeScript",
    languageId: "ts",
    src: () => import("shiki/langs/typescript.mjs"),
  },
  tsx: {
    name: "TSX",
    languageId: "ts",
    src: () => import("shiki/langs/tsx.mjs"),
  },
  vue: {
    name: "Vue",
    src: () => import("shiki/langs/vue.mjs"),
  },
  xml: {
    name: "XML",
    languageId: "xml",
    src: () => import("shiki/langs/xml.mjs"),
  },
  yaml: {
    name: "YAML",
    languageId: "yaml",
    src: () => import("shiki/langs/yaml.mjs"),
  },
  zig: {
    name: "Zig",
    src: () => import("shiki/langs/zig.mjs"),
  },
};
