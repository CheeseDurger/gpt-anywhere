/// <reference types="chrome-types"/>
import { ChromeOptionsAdapter } from "./03-adapters/primary/ChromeOptions";
import { ChromeContextMenusAdapter } from "./03-adapters/primary/ChromeContextMenus";
import { ChromeCompleteAdapter } from "./03-adapters/primary/ChromeComplete";

new ChromeOptionsAdapter().init();
new ChromeContextMenusAdapter().init();
new ChromeCompleteAdapter().init();
