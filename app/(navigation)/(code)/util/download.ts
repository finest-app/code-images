const download = (dataURL: string, filename: string) => {
  if (window.preload) {
    window.preload.downloadFile(dataURL, filename);

    return;
  }

  const link = document.createElement("a");
  link.download = filename;
  link.href = dataURL;
  link.click();
};

export default download;
