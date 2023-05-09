import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import "primeflex/primeflex.css";

const app = createApp(App);
app.use(PrimeVue);
app.use(ToastService);
app.mount("#app");
