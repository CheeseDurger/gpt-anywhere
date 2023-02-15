<script setup lang="ts">
/// <reference types="chrome-types"/>

import { reactive, ref, type Ref, toRaw, computed, type ComputedRef } from 'vue';
import type { Tooltip } from 'bootstrap';

import ApiKey from './components/ApiKey.vue'
import Prompt from './components/Prompt.vue'

import type { PromptDTO } from "../../01-shared/types";

const key: string = "prompts";

let prompts: PromptDTO[] = reactive([]);
let nextIndex: Ref<number> = ref( 0 );

function getStoredPrompts() {
  chrome.storage.sync.get(key).then( object => {
    if (key in object) prompts = reactive(object[key]);
    nextIndex.value = prompts.length;
  });
};

getStoredPrompts();

function savePrompt(prompt: PromptDTO, index: number, tooltip: Tooltip) {
  prompts[index] = prompt;
  chrome.storage.sync.set({[key]: toRaw(prompts)}).then(() => {
    setTimeout(function () {
      tooltip.hide();
    }, 1000);
  });
  nextIndex.value = prompts.length;
};

function deletePrompt(index: number) {
  prompts.splice(index, 1);
  chrome.storage.sync.set({[key]: toRaw(prompts)});
  nextIndex.value = prompts.length;
};

const emptyPrompt: PromptDTO = {
  name: "",
  value: "",
};

</script>

<template>
  <main>
    <ApiKey />
    <Prompt v-for="(prompt, index) in prompts" :index="index" :last="false" :prompt="prompt" @savePrompt="savePrompt" @deletePrompt="deletePrompt"/>
    <Prompt :index="nextIndex" :last="true" :prompt="emptyPrompt" @savePrompt="savePrompt" @deletePrompt="deletePrompt"/>
  </main>
</template>
