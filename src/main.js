import { createApp } from "vue";
import App from "./App.vue";

import BaseBlock from "./components/BaseBlock.vue";
import BaseTypeInput from "./components/BaseTypeInput.vue";
import BaseButton from "./components/BaseButton.vue";

const app = createApp(App);

app.component("BaseBlock", BaseBlock);
app.component("BaseTypeInput", BaseTypeInput);
app.component("BaseButton", BaseButton);

app.mount("#app");
