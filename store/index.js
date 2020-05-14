import Vue from 'vue';
import Vuex from 'vuex';
const axios = require('axios');
import { formatData } from '../helpers';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        chartData: []
    },
    mutations: {
        GET_DATA(state, data) {
            state.chartData = data
        },
    },
    getters: {
        chartDatas: state => state.chartData
    },
    actions: {
        async getData({ commit }) {
            const baseURI = "https://updates.suade.org/files/people.json";
            const { data } = await axios.get(baseURI);
            let formattedData = formatData(data);
            commit('GET_DATA', formattedData);
            // axios.get(baseURI).then(result => {
            //     let data = formatData(result.data);
            //     commit('GET_DATA', data)
            // }).catch((error) => {
            //     console.log('Error occurred', error);
            // });
        },
    }
})