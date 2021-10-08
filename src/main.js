import { createApp } from "vue";
import App from "./App.vue";

import BaseBlock from "./components/base/BaseBlock.vue";
import TypeInput from "./components/forms/TypeInput.vue";

const app = createApp(App);

app.component("BaseBlock", BaseBlock);
app.component("TypeInput", TypeInput);

app.mount("#app");
