import { createApp } from 'vue';
import App from './App.vue';
import VueTheMask from 'vue-the-mask';
import { MotionPlugin } from '@vueuse/motion'

const app = createApp(App);

app.use(VueTheMask);
app.use(MotionPlugin);
app.mount('#app');

console.log()