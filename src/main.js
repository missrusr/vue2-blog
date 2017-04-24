import Vue from "vue";
import App from "./app";
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './store/store'

Vue.use(VueRouter)
Vue.use(VueResource)

const Uoo = { template: '<div>this is Uoo</div>'}
const Foo = { template: '<div>this is foo</div>'}
const Roo = { template: '<div>this is Roo</div>'}

const routes = [
	{ path: '/', component: Uoo },
	{ path: '/foo', component: Foo },
	{ path: '/roo', component: Roo }
]

const router = new VueRouter({
	routes
})

new Vue({
    el:'#app', 
    render:h=> h(App),
    router,
    store
})