import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { DataDTO, PromptDTO } from "../../01-shared/StorageDTO";
import { ApiRequest, Endpoint, SaveDataRequest } from "../../01-shared/ApiDTO/ApiRequest";
import { DataResponse } from "../../01-shared/ApiDTO/ApiResponse";

export const useStorageStore = defineStore('storage', () => {

  // Store state
  const apiKey = ref("");
  const prompts = ref<PromptDTO[]>([]);

  // Store state watchers
  watch(
    apiKey,
    async (newApiKey: string) => {
      saveData(newApiKey, prompts.value);
    },
  );
  watch(
    prompts,
    async (newPrompts: PromptDTO[]) => {
      saveData(apiKey.value, newPrompts);
    },
    { deep: true },
  );

  
  // Store actions
  async function load() {

    let request: ApiRequest = { endpoint: Endpoint.GET_DATA, payload: undefined };
    let response: unknown = await chrome.runtime.sendMessage(request);

    // Guard clause: response is not a DataResponse
    if (!DataResponse.isDataResponse(response)) return;

    // Guard clause: response is not successful
    if (!response.success) return;

    apiKey.value = response.data.apiKey;
    prompts.value = response.data.prompts;
  };

  return { apiKey, prompts, load };
  
});

/**
 * Sends a message to the background script to save the data in storage.
 * @param apiKey 
 * @param prompts 
 */
async function saveData(apiKey: string, prompts: PromptDTO[]) {
  const data = new DataDTO(apiKey, prompts);
  const request: SaveDataRequest = new SaveDataRequest(data);
  await chrome.runtime.sendMessage(request);
};
