import { config } from "../../01-shared/config";
import { AiPort, aiFactory } from "../02-ports/output/Ai";
import { DataDTO } from "../02-ports/output/DTO";
import { PublisherPort, publisherFactory } from "../02-ports/output/Publisher";
import { storageFactory } from "../02-ports/output/Storage";

/**
 * @description publish a completion from 
 */
export class CompleteUseCase {

  public async handle(promptId: number, selectedText: string, tabId: number) {
    const data: DataDTO = await storageFactory().data();
    const prompt: string = this.getPrompt(data.prompts[promptId].value, selectedText);
    console.log("Prompt:\n", prompt);

    try {
      const ai: AiPort = aiFactory(data.apiKey);
      const reader: ReadableStreamDefaultReader<string> = await ai.getCompletion(prompt);
      const publisher: PublisherPort = publisherFactory();
      await publisher.publish(reader, tabId);
    } catch (error) {
      console.error("ERROR: error from OpenAI servers\n", error);
    }
  
  };

  private getPrompt(prompt: string, selectedText: string) {
    // @ts-ignore: string.matchAll() requires adding a specific lib for Typescript types
    return prompt.replaceAll(config.prompt.susbstitutionPlaceholder, selectedText);
  };

};
