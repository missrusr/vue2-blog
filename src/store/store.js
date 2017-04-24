import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import login from './login'
import logins from './logins'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	modules: {
		user,
		login,
		logins
	}
})

// export default new Vuex.Store({
// 	state: {
// 		count: 0
// 	},
// 	mutations: {
// 		increment (state) {
// 			state.count++
// 		} 
// 	}
// })