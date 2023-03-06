import { config } from "../../config";
import { OpenAIAdapter } from "../../03-adapters/secondary/OpenAI";

export interface AiPort {
  getCompletion: (prompt: string) => Promise< ReadableStreamDefaultReader<string> >;
};

export function aiFactory(apiKey: string): AiPort {
  return new OpenAIAdapter(apiKey, config.openai.endpoint, config.openai.model);
};
