// @ts-ignore
export const pageview = (url) => {
  // @ts-ignore
  window.gtag("config", "G-M4FQ2QFSPN", {
    page_path: url,
  });
};

// @ts-ignore
export const event = ({ action, params }) => {
  // @ts-ignore
  window.gtag("event", action, params);
};
