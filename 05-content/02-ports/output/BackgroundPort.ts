import { ChromeBackgroundAdapter } from "../../03-adapters/secondary/ChromeBackgroundAdapter";

export interface BackgroundPort {
  complete: () => Promise<void>;
};

export function backgroundFactory(): BackgroundPort {
  return new ChromeBackgroundAdapter();
};