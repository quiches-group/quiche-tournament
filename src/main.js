import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./index.css";
import quichtify from "quichtify";
import "quichtify/dist/style.css";

const app = createApp(App);

app.use(quichtify);
app.use(createPinia());
app.use(router);

app.mount("#app");
