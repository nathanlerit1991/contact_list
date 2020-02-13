import Vue from 'vue'
import Vuex from 'vuex'

// import { getField, updateField } from 'vuex-map-fields'

Vue.use(Vuex)

import {home} from './home.js'

const store = new Vuex.Store({
    namespaced: true,
    modules: {
        home,
    }
})

export default store
