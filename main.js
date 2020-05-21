import Vue from 'vue';
import App from './public/App.vue';
import axios from 'axios';
import store from './store';
import router from './router';
import Chart from 'chart.js';

Vue.prototype.$http = axios;
Vue.prototype.$chart = Chart;

new Vue({
    el: '#app',
    router,
    store,
    Chart,
    render: h => h(App)
})
