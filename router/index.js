import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'charts-comp', // think this is the template name
            component: Chart // import this component
        }
    ]
})