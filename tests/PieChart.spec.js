import PieChart from '../components/PieChart.vue';
import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

const localVue = createLocalVue()

localVue.use(Vuex)

// Renders, expect to see a canvas element rendered to the dom 
describe('PieChart', () => {

    let actions
    let state
    let $store

    beforeEach(() => {
        state = {
            chartData: [{ count: 20, edit: false, id: '"_oif95mlxg"', name: 'apple', type: 'fruits' }]
        }

        actions = {
            moduleActionClick: jest.fn()
        }

        this.$store = new Vuex.Store({
            modules: {
                myModule: {
                    state,
                    actions,
                    getters: myModule.getters
                }
            }
        })
    })

    test.only('Should render Pie chart canvas', () => {
        const wrapper = mount(PieChart, {
            propsData: {
                chartData: [{ count: 20, edit: false, id: '"_oif95mlxg"', name: 'apple', type: 'fruits' }]
            }
        });
        expect(wrapper.html().toContain('<canvas></canvas>'))
    })
    // test('Pie chart correctly renders to the DOM', () => {

    // })
})

// expect displayPieChart to be called 