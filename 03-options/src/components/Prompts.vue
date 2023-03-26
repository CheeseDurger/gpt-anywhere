<script setup lang="ts">
import type { PromptDTO } from "../../../01-shared/StorageDTO";
import Prompt from './Prompt.vue'
import { useStorageStore } from '../store';

const storeStorage = useStorageStore();

const emptyPrompt: PromptDTO = {
  id: Number.MAX_SAFE_INTEGER,
  name: "",
  value: "",
};

function savePrompt(prompt: PromptDTO, index: number) {
  console.log('savePrompt', prompt, index);
  storeStorage.prompts[index].value = prompt.value;
};

</script>

<template>

  <div class="my-5">
    <h2 class="h4">Prompts</h2>

    <Prompt v-for="(prompt, index) in storeStorage.prompts" :index="index" :last="false" :prompt="prompt" />
    <Prompt :index="storeStorage.prompts.length" :last="true" :prompt="emptyPrompt" />

  </div>
</template>
