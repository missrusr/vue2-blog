import Vue from 'vue'

export default {
	//JSON.parse将一个字符串解析成JSON对象
	state: JSON.parse(sessionStorage.getItem('user')) || {},
	mutations: {
		logIn(state, user) { //登录 
			sessionStorage.setItem('user', JSON.stringify(user))
			Object.assign(state, user) //将属性copy进入state中
		},
		logOut(state) { //登出
			sessionStorage.removeItem('user')
			// Object.keys(state).forEach(k => Vue.detele(state, k))
			// Object.assign(state, {})
		}
	},
	actions: {
		logIn({commit}, user) {
			commit('logIn', user)
		},
		logOut({commit}) {
			commit('logOut')
		}
	}
}