<!-- login模板 -->
<template>
	<div id="login">
		<div class="title">
			<h3>登录</h3>
		</div>
		<div class="loginMsg">
			<input type="text" name="name" v-model="form.name">
			<input type="text" name="pass" v-model="form.qq">
		</div>
		<div class="button">
			<button @click="toSubmit">确定</button>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		data() {
			return {
				issubmit: false,
				form: {
					name: '',
					qq: '',
					hasLogin: false
				}
			}
		},
		methods: {
			...mapActions(['disableLogin', 'logIn', 'loginSuccess']),
			toSubmit: function () {
				this.issubmit = true;

				if (!this.form.qq || !this.form.name) return;
				this.form.hasLogin = true;
				this.disableLogin();
				this.logIn(this.form);
				this.loginSuccess();

			}
		}
	}
</script>