<script setup lang="ts">
import { reactive, ref, type Ref, toRaw } from 'vue';

import type { PromptDTO } from "../../../01-shared/types";

import Prompt from './Prompt.vue'

const key: string = "prompts";

let prompts: PromptDTO[] = reactive([]);
const nextIndex: Ref<number> = ref(0);
chrome.storage.sync.get(key).then(object => {
  if (key in object) prompts = reactive(object[key]);
  nextIndex.value = prompts.length;
});

const emptyPrompt: PromptDTO = {
  name: "",
  value: "",
};

function savePrompt(prompt: PromptDTO, index: number) {
  prompts[index] = prompt;
  chrome.storage.sync.set({ [key]: toRaw(prompts) });
  nextIndex.value = prompts.length;
};

function deletePrompt(index: number) {
  prompts.splice(index, 1);
  chrome.storage.sync.set({ [key]: toRaw(prompts) });
  nextIndex.value = prompts.length;
};

</script>

<template>

  <div class="my-5">
    <h2 class="h4">Prompts</h2>

    <Prompt v-for="(prompt, index) in prompts" :index="index" :last="false" :prompt="prompt" @savePrompt="savePrompt"
      @deletePrompt="deletePrompt" />
    <Prompt :index="nextIndex" :last="true" :prompt="emptyPrompt" @savePrompt="savePrompt"
      @deletePrompt="deletePrompt" />

  </div>
</template>
