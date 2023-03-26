<script setup lang="ts">
import { Tooltip } from 'bootstrap';
import { useStorageStore } from '../store';

const storeStorage = useStorageStore();

function save(): void {
  storeStorage.apiKey = (document.getElementById("apiKey") as HTMLInputElement).value;
  const button: HTMLButtonElement = document.getElementById('save-apiKey') as HTMLButtonElement;
  const tooltip = new Tooltip(button);
  tooltip.show();
  setTimeout(function () {
    tooltip.hide();
  }, 1000);
};

function toggle(): void {
  const input: HTMLInputElement = document.getElementById("apiKey") as HTMLInputElement;
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
        <input class="form-control" id="apiKey" type="password" :value="storeStorage.apiKey">
        <div class="form-check form-switch">
          <input class="form-check-input" id="apiKey-label" type="checkbox" role="switch"
            @click="toggle">
          <label class="form-check-label" for="apiKey-label">
            Show API key
          </label>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-success" id="save-apiKey"
      data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="manual"
      data-bs-title="Saved!" @click="save">
      Save API key
    </button>
  </div>
  <hr>
</template>