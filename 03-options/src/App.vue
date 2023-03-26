<script setup lang="ts">
/// <reference types="chrome-types"/>
import Header from './components/Header.vue';
import ApiKey from './components/ApiKey.vue';
import Prompts from './components/Prompts.vue';
import Footer from './components/Footer.vue';
import { useStorageStore } from './store';

useStorageStore().load(); // initialize state

</script>

<template>
  <main>
    <Header />
    <ApiKey />
    <Prompts />
    <Footer />
  </main>
</template>
