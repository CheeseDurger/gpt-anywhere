<script setup lang="ts">
import { Tooltip } from "bootstrap";
import type { PromptDTO } from "../../../01-shared/types";

const props = defineProps<{
  last: boolean;
  prompt: PromptDTO;
  index: number;
}>();

const emit = defineEmits<{
  (event: 'savePrompt', prompt: PromptDTO, index: number): void;
  (event: 'deletePrompt', index: number): void;
}>();

const title: string = props.last ? 'Add new prompt' : 'Prompt ' + (props.index + 1).toString();

function save() {
  let input: HTMLInputElement = document.getElementById('prompt-name-' + props.index.toString()) as HTMLInputElement;
  let textArea: HTMLTextAreaElement = document.getElementById('prompt-value-' + props.index.toString()) as HTMLTextAreaElement;
  let newPrompt: PromptDTO = {
    name: input.value,
    value: textArea.value,
  }

  if (!props.last) {
    let button: HTMLButtonElement = document.getElementById('save-' + props.index.toString()) as HTMLButtonElement;
    const tooltip = new Tooltip(button);
    tooltip.show();
    setTimeout(() => tooltip.hide(), 1000);
  }
  
  emit('savePrompt', newPrompt, props.index);
};

</script>

<template>
  
  <div class="my-4">

    <h3 class="h5">{{ title }}</h3>

    <div class="row my-2">
      <label class="col-2 col-form-label" :for="'prompt-name-' + index.toString()">Prompt name:</label>
      <div class="col-10">
        <input class="form-control" :id="'prompt-name-' + index.toString()" type="text" :value="prompt.name" :aria-describedby="'prompt-name-help-' + index.toString()">
        <div class="form-text small" :id="'prompt-name-help-' + index.toString()">
          A recognizable name for the prompt (eg. "Twitter")
        </div>
      </div>
    </div>

    <div class="row my-2">
      <label class="col-2 col-form-label" :for="'prompt-value-' + index.toString()">Prompt text:</label>
      <div class="col-10">
        <textarea class="form-control" :id="'prompt-value-' + index.toString()" :value="prompt.value" :aria-describedby="'prompt-value-help-' + index.toString()"></textarea>
        <div class="form-text" :id="'prompt-value-help-' + index.toString()">
          The prompt sent to GPT (eg. "Write a viral tweet about...")
        </div>
      </div>
    </div>

    <button v-if="!last" class="btn btn-success me-2" :id="'save-' + index.toString()" type="button"
    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="manual" data-bs-title="Saved!"
    @click="save()">
      {{last ? 'Add prompt' : 'Save prompt ' + (index + 1).toString()}}
    </button>
    <button v-if="!last" class="btn btn-secondary" :id="'delete-' + index.toString()" type="button" @click="$emit('deletePrompt', index)">{{"Delete prompt " + (index + 1).toString()}}</button>
    <button v-if="last" class="btn btn-success" :id="'save-' + index.toString()" type="button"
    @click="save()">
      Add prompt
    </button>

  </div>

  <hr v-if="!last" />

</template>
