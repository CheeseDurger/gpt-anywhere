import { DataDTO, PromptDTO } from "../StorageDTO";

describe('Storage', () => {

  let prompt: any;
  
  test('PromptDTO', () => {
    prompt = new PromptDTO(0, "", "");
    expect(PromptDTO.isPromptDTO(prompt)).toBe(true);
    prompt = { id: 0, name: "", value: "", ok: "ok"};
    expect(PromptDTO.isPromptDTO(prompt)).toBe(true);
    prompt = { id: "ok", name: "", value: ""};
    expect(PromptDTO.isPromptDTO(prompt)).toBe(false);
    prompt = { id: 0, name: "", value: 1};
    expect(PromptDTO.isPromptDTO(prompt)).toBe(false);
    prompt = { id: 0, name: 1, value: ""};
    expect(PromptDTO.isPromptDTO(prompt)).toBe(false);
  });

  let data: any;

  test('DataDTO', () => {
    data = new DataDTO("", []);
    expect(DataDTO.isDataDTO(data)).toBe(true);
    data = { version: 1, apiKey: "", prompts: [], ok: "ok"};
    expect(DataDTO.isDataDTO(data)).toBe(true);
    data = { version: 0, apiKey: "", prompts: []};
    expect(DataDTO.isDataDTO(data)).toBe(false);
    data = { version: 1, apiKey: 1, prompts: []};
    expect(DataDTO.isDataDTO(data)).toBe(false);
    data = { version: 1, apiKey: "", prompts: [1]};
    expect(DataDTO.isDataDTO(data)).toBe(false);
    data = { version: 1, apiKey: "", prompts: [new PromptDTO(0, "", "")]};
    expect(DataDTO.isDataDTO(data)).toBe(true);
  });
  
});
