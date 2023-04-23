/// <reference types="chrome-types" />
import { config } from "../../01-shared/config";
import { DataDTO, PromptDTO } from "../../01-shared/StorageDTO";
import { CompleteRequest, OpenRequest } from "../../01-shared/ApiDTO/ApiRequest";
import { AiPort, aiFactory } from "../02-ports/output/Ai";
import { PublisherPort, publisherFactory } from "../02-ports/output/Publisher";
import { storageFactory } from "../02-ports/output/Storage";

/**
 * @description publish a completion from 
 */
export class OpenAndCompleteUseCase {

  /**
   * Open a port to target tab and stream completion
   * 
   * @description
   * 1. Build final prompt text
   * 2. Call API method to get completion
   */
  public async handleFromContextMenu(menuItemId: number, selectionText: string, tabId: number): Promise<void> {

    const data: DataDTO = await storageFactory().get();
    const index: number = data.prompts.findLastIndex((prompt: PromptDTO) => prompt.id === menuItemId);

    // Guard clause: prompt must be found
    if (index === -1) {
      console.error("ERROR: prompt not found");
      return;
    };

    const promptText: string = this.buildFinalPrompt(data.prompts[index].value, selectionText);

    const request = new CompleteRequest(
      promptText,
      selectionText,
      tabId,
    );
    await this.handleFromAPI(request);
  };

  /**
   * Open a port to target tab and stream completion
   */
  public async handleFromAPI(request: CompleteRequest): Promise<void> {

    // Open modal
    const openRequest: OpenRequest = new OpenRequest(
      request.payload.promptText,
      request.payload.selectionText,
    );
    await publisherFactory().openModal(request.payload.tabId, openRequest);

    // Build prompt
    const data: DataDTO = await storageFactory().get();
    const prompt: string = this.buildFinalPrompt(
      request.payload.promptText,
      request.payload.selectionText,
    );

    // Retrieve completion and send to modal
    try {
      const ai: AiPort = aiFactory(data.apiKey);
      const reader: ReadableStreamDefaultReader<string> = await ai.getCompletion(prompt);
      const publisher: PublisherPort = publisherFactory();
      await publisher.publish(request.payload.tabId, reader);
    } catch (error) {
      console.error("ERROR: error from OpenAI servers\n", error);
    }
  
  };

  /**
   * Build final prompt
   * @param promptText 
   * @param selectedText 
   * @returns final prompt
   */
  private buildFinalPrompt(promptText: string, selectionText: string): string {
    return promptText.replaceAll(config.prompt.susbstitutionPlaceholder, selectionText);
  };

};
