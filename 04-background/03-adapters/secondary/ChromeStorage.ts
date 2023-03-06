import { config } from "../../config";
import { DataDTO, StoragePort } from "../../02-ports/output/Storage";

/**
 * Get data from storage
 * @returns data from sync storage
 */
export const chromeStorageAdapter: StoragePort = {
  data: async (): Promise<DataDTO> => {
    const storage = await chrome.storage.sync.get(null as any);
    return {
      apiKey: storage[config.storage.apiKeyKey] || "",
      prompts: storage[config.storage.promptsKey] || [],
    };
  },
};
