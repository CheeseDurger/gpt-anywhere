import type { Model } from "./types";

export const config = {
  openai: {
    endpoint: "https://api.openai.com/v1/completions",
    model: {
      name: "text-davinci-003",
      maxTokens: 4097,
    } as Model,
  },
  prompt: {
    susbstitutionPlaceholder: "%SUBSTITUTION%",
  },
  storage: {
    apiKeyKey: "apiKey",
    promptsKey: "prompts",
  },
  ui: {
    color: {
      primary: "crimson",
      secondary: "lightsalmon",
    },
  },
};