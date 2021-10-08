import { createApp } from "vue";
import App from "./App.vue";

import BaseBlock from "./components/base/BaseBlock.vue";

const app = createApp(App);

app.component("base-block", BaseBlock);

app.mount("#app");
