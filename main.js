import Vue from 'vue';
import App from './public/App.vue';
import './node_modules/@fortawesome/fontawesome-free/css/all.css';
import './node_modules/@fortawesome/fontawesome-free/js/all.js';
import axios from 'axios';
// import * as d3 from 'd3';


Vue.prototype.$http = axios
// Vue.prototype.$d3 = d3;


new Vue({
    el: '#app',
    render: h => h(App)
})
