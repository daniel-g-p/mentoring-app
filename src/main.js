import { createApp } from "vue";
import App from "./App.vue";

import BaseBlock from "./components/base/BaseBlock.vue";
import TypeInput from "./components/forms/TypeInput.vue";
import RadioField from "./components/forms/RadioField.vue";

const app = createApp(App);

app.component("BaseBlock", BaseBlock);
app.component("TypeInput", TypeInput);
app.component("RadioField", RadioField);

app.mount("#app");
