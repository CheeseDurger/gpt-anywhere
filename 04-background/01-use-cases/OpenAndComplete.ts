/// <reference types="chrome-types" />
import { config } from "../../01-shared/config";
import { DataDTO } from "../../01-shared/StorageDTO";
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
   */
  public async handle(request: CompleteRequest): Promise<void> {

    // Open modal
    const openModalRequest: OpenRequest = new OpenRequest(
      request.payload.promptId,
      request.payload.selectionText,
    );
    await publisherFactory().openModal(request.payload.tabId, openModalRequest);

    // Build prompt
    const data: DataDTO = await storageFactory().get();
    const prompt: string = this.buildFinalPrompt(
      data,
      request.payload.promptId,
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
   * @param prompt 
   * @param selectedText 
   * @returns final prompt
   */
  private buildFinalPrompt(data: DataDTO, promptId: number, selectionText: string): string {
    const prompt = data.prompts.find( prompt => prompt.id === promptId );
    if (prompt === undefined) {
      console.error("ERROR: prompt data corrupted. Please, backup your prompts and re-install the extension.", data.prompts);
      throw new Error("ERROR: prompt data corrupted");
    };
    return prompt.value.replaceAll(config.prompt.susbstitutionPlaceholder, selectionText);
  };

};
