<script setup lang="ts">

import { Tooltip } from 'bootstrap';
import { ref, type Ref } from 'vue';

const key: string = "apiKey";
const apiKey: Ref<string> = ref("");

chrome.storage.sync.get(key).then(object => {
  if (key in object) apiKey.value = object[key];
});

function saveApiKey(): void {
  apiKey.value = (document.getElementById("apiKey") as HTMLInputElement).value;
  let button: HTMLButtonElement = document.getElementById('save-apiKey') as HTMLButtonElement;
  const tooltip = new Tooltip(button);
  tooltip.show();
  chrome.storage.sync.set({ [key]: apiKey.value }).then(() => {
    setTimeout(function () {
      tooltip.hide();
    }, 1000);
  });
};

function toggleApiKey(): void {
  let input: HTMLInputElement = document.getElementById("apiKey") as HTMLInputElement;
  if (input.type === "password") input.type = "text";
  else input.type = "password";
};
</script>

<template>
  <div class="my-4">
    <h2 class="h4">Your API key</h2>
    <fieldset class="g-2" name="apiKey">
      <div class="my-2">
        <label class="form-label" for="apiKey">Your <a href="https://openai.com/" target="_blank">OpenAI</a> API key:</label>
        <input class="form-control" id="apiKey" type="password" :value="apiKey">
        <input class="form-check-input" id="apiKey-label" type="checkbox" @click="toggleApiKey">
        <label class="form-check-label" for="apiKey-label">
          Show API key
        </label>
      </div>
    </fieldset>
    <button type="button" class="btn btn-secondary" id="save-apiKey"
    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="manual" data-bs-title="Saved!"
    @click="saveApiKey">
      Save
    </button>
  </div>
</template>