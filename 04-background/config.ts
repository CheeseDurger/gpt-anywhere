import { Model } from "./02-ports/output/DTO";

export const config = {
  openai: {
    endpoint: "https://api.openai.com/v1/completions",
    model: {
      name: "text-davinci-003",
      maxTokens: 4097,
    } as Model,
  },
  storage: {
    apiKeyKey: "apiKey",
    promptsKey: "prompts",
  },
};
