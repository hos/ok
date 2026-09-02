export const revealImageWhenLoaded = (node: HTMLImageElement | null) => {
  if (!node) {
    return;
  }

  const reveal = () => {
    node.dataset.loaded = "true";
  };

  if (node.complete) {
    reveal();
  } else {
    node.addEventListener("load", reveal, { once: true });
  }
};
