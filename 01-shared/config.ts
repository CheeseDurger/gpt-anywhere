export const config = {
  openai: {
    endpoint: "https://api.openai.com/v1/completions",
    model: "text-davinci-003",
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
    id: {
      shadowRoot: "gpt-anywhere-shadow-root",
    },
  },
  error: {
    messages: {
      default: "\nERROR: error from OpenAI servers",
    },
  },
};