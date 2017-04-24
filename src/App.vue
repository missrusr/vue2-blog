<template>
   <div id="app">
     <div>hello HR, this hetengjob!</div>
     <!-- 登录模块 -->
     <div v-if="hasLogin">
     	<span>{{user.name}}欢迎您</span>
     	<span>|</span>
     	<button @click="toLogout">退出</button>
     </div>
     <div v-else>
     	<button>登录</button>
     </div>
     <waterfall></waterfall>
     <login></login>
     <router-link to="/foo">go to foo</router-link>
     <router-link to="/roo">go to Roo</router-link>
     <router-view></router-view>
     <ul>
     	<li><a href="/login">版块主页</a></li>
     	<li><img src="/img/2.jpg" alt=""></li>
     	<li>{{msg}}</li>
     	<li @click="getkoa">click me</li>
     	<li @click="akfun">click you</li>
     </ul>
     <form action="">
     	<input v-model="formData.username.value" type="text" name="username">
     	<input @click="akfun" type="button" value="提交">
     </form>
   </div>
</template>

<script>
	import { mapActions } from 'vuex'
	import Login from './components/login/Login'
	import Waterfall from './components/waterfall/Waterfall'

	export default {
		components: {
			Login,
			Waterfall
		},
		data () {
			return {
				formData: {
					username: {
						value: ''
					}
				},
				msg: this.$store.state.logins.chun,
				user: {},
				hasLogin: this.$store.state.user.hasLogin
			}
		},
		computed: {
			hasLogin () {
				return this.$store.state.login.hasLogin ? this.$store.state.login.hasLogin : this.$store.state.user.hasLogin;
			},
			user () {
				return this.$store.state.user;
			}
		},
		methods: {
			...mapActions(['enableLogin', 'logOut', 'loginFail']),
			getkoa: function () {
				this.$http.get('/test/test.json')
					.then(function (response) {
						console.log(response.body.name);
					})
					.catch(function (response) {
						console.log(response);
					})
			},
			akfun: function () {
				var that = this;
				var username = this.formData.username.value;
				// , {foo: username}
				this.$http.post('/regedit')
					.then(function (response) {
						console.log(response.body.name);
					})
					.catch(function (response) {
						console.log(response);
					})
				this.$router.replace({ path: '/' })

				that.formData.username.value = '';
			},
			toLogout: function () {
				this.logOut();
		        this.loginFail();
		        this.$router.replace({ path: '/' });
		        location.reload();
			}
		}
	}
</script>

<style>  
     body{color:red;}
</style>