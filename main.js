import Vue from 'vue';
import App from './public/App.vue';
import './node_modules/@fortawesome/fontawesome-free/css/all.css';
import './node_modules/@fortawesome/fontawesome-free/js/all.js';
import axios from 'axios';
import store from './store';
import * as d3 from "d3";
import bb from "billboard.js";
import "billboard.js/dist/billboard.css";
import Chart from 'chart.js';

Vue.prototype.$http = axios;
Vue.prototype.$bb = bb;
Vue.prototype.$chart = Chart;

new Vue({
    el: '#app',
    store,
    bb,
    d3,
    Chart,
    render: h => h(App)
})
