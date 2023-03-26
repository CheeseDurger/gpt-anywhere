import { OpenModalRequest } from "../../../01-shared/ApiDTO/ApiRequest";
import { ChromePublisherAdapter } from "../../03-adapters/secondary/ChromePublisher";

export interface PublishRequest {
  reader: ReadableStreamDefaultReader<string>;
  location: chrome.tabs.Tab;
};

export interface PublisherPort {
  publish: (tabId: number, reader: ReadableStreamDefaultReader<string>) => Promise<void>;
  openModal: (tabId: number, request: OpenModalRequest) => Promise<void>;
};

export function publisherFactory(): PublisherPort {
  return new ChromePublisherAdapter();
};
