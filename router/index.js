import Vue from 'vue';
import Router from 'vue-router';
import BarChart from '../components/BarChart.vue';
import PieChart from '../components/PieChart.vue';
import Pagination from '../components/Pagination.vue';
import Upload from '../components/Upload.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/pagination',
            name: 'pagination',
            component: Pagination
        },
        {
            path: '/upload',
            name: 'upload',
            component: Upload
        },
        {
            path: '/',
            name: 'default',
            component: BarChart
        },
        {
            path: '/bar-chart',
            name: 'bar-chart',
            component: BarChart
        },
        {
            path: '/pie-chart',
            name: 'pie-chart',
            component: PieChart
        }
    ]
})