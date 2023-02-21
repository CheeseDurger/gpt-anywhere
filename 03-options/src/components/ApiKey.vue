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
  <div class="my-5">
    <h2 class="h4">API key</h2>
    <div class="row my-2">
      <label class="col-2 col-form-label" for="apiKey">OpenAI API key:</label>
      <div class="col-10">
        <input class="form-control" id="apiKey" type="password" :value="apiKey">
        <div class="form-check form-switch">
          <input class="form-check-input" id="apiKey-label" type="checkbox" role="switch" @click="toggleApiKey">
          <label class="form-check-label" for="apiKey-label">
            Show API key
          </label>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-success" id="save-apiKey"
    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="manual" data-bs-title="Saved!"
    @click="saveApiKey">
      Save API key
    </button>
  </div>
  <hr>
</template>