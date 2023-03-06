import { ChromeOptionsAdapter } from "../../03-adapters/secondary/ChromeOptions";

export interface OptionsPort {
  open: () => Promise<void>;
};

export function optionsFactory() {
  return new ChromeOptionsAdapter();
};
