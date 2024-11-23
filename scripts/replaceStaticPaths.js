import("replace-in-file").then(async (module) => {
  await module.replaceInFile({
    files: "out/**/*",
    ignore: "out/**/*.css",
    from: /\/_next/g,
    to: "./_next",
  });

  await module.replaceInFile({ files: "out/**/*.css", from: /\/_next\/static/g, to: ".." });
});
