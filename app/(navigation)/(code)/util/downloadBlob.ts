const downloadBlob = (blob: Blob, filename: string) => {
  if (window.preload) {
    window.preload.downloadFile(blob, filename);

    return;
  }

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.click();
};

export default downloadBlob;
