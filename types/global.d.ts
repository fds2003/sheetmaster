/// <reference types="next">

declare namespace globalThis {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>,
    ) => void;
    dataLayer: unknown[];
  }
}
