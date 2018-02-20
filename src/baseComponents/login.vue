<template>
  <mu-dialog :open="dialog" @close="close" title="SIGN IN" dialogClass="login-dialog"  >
    <mu-text-field v-model="userName" label="Username" hintText="请输入用户名" type="text" labelFloat underlineFocusClass="border-focus" labelFocusClass="label-focus"/><br/>
    <mu-text-field v-model="passWord" label="Password" hintText="请输入密码" type="password" labelFloat underlineFocusClass="border-focus" labelFocusClass="label-focus"/><br/>
    <mu-flat-button slot="actions" primary @click=_login label="确定"/>
    <mu-toast v-if='toast' :message="toastMsg"/>
  </mu-dialog>
</template>

<script>
  import {login} from "../api/login";
  import {MD5} from "../api/API_BASE";
  export default {
        name: "login",
        data() {
          return {
            dialog: false,
            userName: '',
            passWord: '',
            toast: false,
          }
        },
        methods: {
          close() {
            this.dialog = false
          },
          toastMeg(msg) {
            this.toast = true;
            this.toastMsg = msg;
            setTimeout(() => {
              this.toast = false;
            }, 2000)
          },
          _login() {
            console.log(this.$refs.sss);
            var hash = MD5(this.passWord);
            var user = {userName: this.userName, passWord: hash};
            login(user)
              .then((res) => {
                if (res.data.login) {
                  this.setCookie('HJ_BLOG_USER', hash, 7 * 24 * 60 * 60 * 1000);
                  this.$router.push('/admin');
                } else {
                  this.toastMeg("账号或密码错误")
                }
              })
              .catch((err) => {
                this.toastMeg("网络异常")
              })
          }
        }
    }
</script>

<style lang="scss">
  .mu-dialog-wrapper{
    .login-dialog{position: relative; top: -50px; width: auto; background: url("../../static/img/bg/sign-in.jpg") no-repeat center; background-size: cover;}
  }
  .label-focus{color: #000000; font-size: 20px;}
  .mu-text-field {
    .border-focus {
      background-color: #ffffff;
    }
  }
</style>
