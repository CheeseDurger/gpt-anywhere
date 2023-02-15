<script setup lang="ts">
import { Tooltip } from "bootstrap";
import type { PromptDTO } from "../../../01-shared/types";

const props = defineProps<{
  last: boolean;
  prompt: PromptDTO;
  index: number;
}>();

const emit = defineEmits<{
  (event: 'savePrompt', prompt: PromptDTO, index: number, tooltip: Tooltip): void;
  (event: 'deletePrompt', index: number): void;
}>();

const title: string = props.last ? 'New prompt' : 'Prompt ' + (props.index + 1).toString();

function save() {
  let input: HTMLInputElement = document.getElementById('prompt-name-' + props.index.toString()) as HTMLInputElement;
  let textArea: HTMLTextAreaElement = document.getElementById('prompt-value-' + props.index.toString()) as HTMLTextAreaElement;
  let newPrompt: PromptDTO = {
    name: input.value,
    value: textArea.value,
  }

  let button: HTMLButtonElement = document.getElementById('save-' + props.index.toString()) as HTMLButtonElement;
  const tooltip = new Tooltip(button);
  tooltip.show();

  emit('savePrompt', newPrompt, props.index, tooltip);
};

</script>

<template>
  <hr />
  <div class="my-4 g-4">
    <h2 class="h4">{{ title }}</h2>
    <fieldset name="prompt">
      <div class="my-2">
        <label class="form-label" :for="'prompt-name-' + index.toString()">Your prompt name:</label>
        <input class="form-control" :id="'prompt-name-' + index.toString()" type="text" :value="prompt.name">
      </div>
      <div class="my-2">
        <label class="form-label" :for="'prompt-value-' + index.toString()">Your prompt text:</label>
        <textarea class="form-control" :id="'prompt-value-' + index.toString()" :value="prompt.value"></textarea>
      </div>
      <button class="btn btn-secondary me-2" :id="'save-' + index.toString()" type="button"
      data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="manual" data-bs-title="Saved!"
      @click="save()">
        {{last ? 'Add' : 'Save'}}
      </button>
      <button class="btn btn-secondary" :class="last ? 'd-none' : ''" :id="'delete-' + index.toString()" type="button" @click="$emit('deletePrompt', index)">Delete</button>
    </fieldset>
  </div>
</template>
