export const jumpUrl = (url: string) => {
  const win = window.open(url);
  if (!win) {
    location.href = url;
  }
};
