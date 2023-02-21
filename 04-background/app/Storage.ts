import { config } from "../../01-shared/config"
import { PromptDTO } from "../../01-shared/types";

export interface Data {
  apiKey: string;
  prompts: PromptDTO[];
}

/**
 * Get data from storage
 * @returns data from sync storage
 */
export async function getData(): Promise<Data> {
  const storage = await chrome.storage.sync.get(null as any);
  return {
    apiKey: storage[config.storage.apiKeyKey] || "",
    prompts: storage[config.storage.promptsKey] || [],
  } as Data;
};
