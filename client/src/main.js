import { createApp } from "vue";
import App from "./App.vue";

import BaseBlock from "./components/BaseBlock.vue";
import BaseTypeInput from "./components/BaseTypeInput.vue";
import BaseButton from "./components/BaseButton.vue";
import BaseModal from "./components/BaseModal.vue";

const app = createApp(App);

app.config.globalProperties.$server = "http://localhost:3000";

app.component("BaseBlock", BaseBlock);
app.component("BaseTypeInput", BaseTypeInput);
app.component("BaseButton", BaseButton);
app.component("BaseModal", BaseModal);

app.mount("#app");
