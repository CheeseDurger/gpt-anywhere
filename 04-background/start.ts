/// <reference types="chrome-types"/>
import { ChromeOptionsAdapter } from "./03-adapters/primary/ChromeOptionsAdapter";
import { ChromeContextMenusAdapter } from "./03-adapters/primary/ChromeContextMenusAdapter";
import { ChromeOpenAndCompleteAdapter } from "./03-adapters/primary/ChromeOpenAndCompleteAdapter";
import { ChromeStorageAdapter } from "./03-adapters/primary/ChromeStorageAdapter";

new ChromeStorageAdapter().init();
new ChromeOptionsAdapter().init();
new ChromeContextMenusAdapter().init();
new ChromeOpenAndCompleteAdapter().init();
