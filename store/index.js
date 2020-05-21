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
        UPDATE_DATA(state, data) {
            state.chartData.map(item => {
                if (item.category === data.type) {
                    item.map((updated) => {
                        if (updated.id === data.id) {
                            Vue.set(updated, 'count', data.count);
                        }
                    })
                }
            });
        }
    },
    getters: {
        chartData: state => state.chartData,
    },
    actions: {
        async getData({ commit }) {
            const baseURI = "https://updates.suade.org/files/people.json";
            const { data } = await axios.get(baseURI);
            let formattedData = formatData(data);
            commit('GET_DATA', formattedData);
        },
        updateData({ commit }, data) {
            commit('UPDATE_DATA', data);
        }
    }
})