import { createApp } from "vue";
import App from "./App";
import components from "@/components/UI/";

const app = createApp(App);
components.forEach((component) => {
    app.component(component.name, component);
});
//app.component позволяет зарегистрировать глобально какой-то компонент

app.mount("#app");
