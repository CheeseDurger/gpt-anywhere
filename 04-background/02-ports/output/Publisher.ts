import { ChromePublisherAdapter } from "../../03-adapters/secondary/ChromePublisher";

export interface PublishRequest {
  reader: ReadableStreamDefaultReader<string>;
  location: chrome.tabs.Tab;
}

export interface PublisherPort {
  publish: (reader: ReadableStreamDefaultReader<string>, tabId: number) => Promise<void>;
};

export function publisherFactory(): PublisherPort {
  return new ChromePublisherAdapter();
}