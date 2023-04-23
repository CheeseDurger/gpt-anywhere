import { CompleteFromTabRequest } from "../../../01-shared/ApiDTO/ApiRequest";
import { ChromeBackgroundAdapter } from "../../03-adapters/secondary/ChromeBackgroundAdapter";

export interface BackgroundPort {
  complete: (request: CompleteFromTabRequest) => void;
};

export function backgroundFactory(): BackgroundPort {
  return new ChromeBackgroundAdapter();
};
