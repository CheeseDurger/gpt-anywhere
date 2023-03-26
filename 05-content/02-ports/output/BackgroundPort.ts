import { ChromeBackgroundAdapter } from "../../03-adapters/secondary/ChromeBackgroundAdapter";

export interface BackgroundPort {
  complete: () => void;
};

export function backgroundFactory(writer: WritableStreamDefaultWriter<string>): BackgroundPort {
  return new ChromeBackgroundAdapter(writer);
};
