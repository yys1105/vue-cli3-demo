<!-- login -->
<template>
  <div class="login-view">
    <div class="login">
        <div class="column"></div>
        <div class="column">
            <div class="login-form">
                <div class="tabs">
                    <div class="item active">账号登录</div>
                    <div class="item">手机号登录</div>
                </div>
                <div class="form">
                    <div class="form-item">
                        <self-input v-model="form.loginName" placeholder="请输入账号名" :icon="iconUser"></self-input>
                    </div>
                    <div class="form-item">
                        <self-input v-model="form.loginPwd" placeholder="请输入密码" :icon="iconPassword" type="password"></self-input>
                    </div>
                    <div class="form-item">
                        <self-input v-model="form.captcha" placeholder="请输入验证码" :icon="iconCode" style="width: 70%"></self-input>
                        <img class="captcha-img" :src="captchaImg" @click="reCaptchImgHanlde">
                    </div>
                </div>
                <div class="btn-login" @click="login_handle">登录</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import SelfInput from "./_input";
import iconUser from "@/assets/images/icon-user.png";
import iconPassword from "@/assets/images/icon-password.png";
import iconCode from "@/assets/images/icon-code.png";
import { mapActions } from "vuex";
import store from "storejs"
export default {
  name: "login-view",
  data() {
    return {
      iconUser,
      iconPassword,
      iconCode,
      captchaImg: "",
      form: {
        loginName: "",
        loginPwd: "",
        captcha: "",
        phone: "",
        smsCode: "",
        type: 1
      }
    };
  },

  components: { SelfInput },

  computed: {},

  created() {
    this.reCaptchImgHanlde();
  },

  mounted() {},

  methods: {
    ...mapActions({
      login: "login/post"
    }),
    reCaptchImgHanlde() {
      this.captchaImg =
        "/b2b/captcha/img-captcha?" + parseInt(Math.random() * 100000000);
    },
    login_handle() {
      if (this.form.loginName.trim() == "") {
        this.$message("请输入账号名！");
        return;
      }
      if (this.form.loginPwd.trim() == "") {
        this.$message("请输入密码！");
        return;
      }
      if (this.form.captcha.trim() == "") {
        this.$message("请输入验证码！");
        return;
      }
      this.login(this.form).then(res => {
        store.set("member",res.data)
        store.set("token",res.data.token)
        this.$router.push({path: "/funds"})
      }).catch(() => {
          this.reCaptchImgHanlde();
      })
    }
  }
};
</script>
<style lang="stylus" scoped>
.login-view
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    background-image url('~assets/images/bg-login.jpg')
    background-position center center
    background-repeat no-repeat
    background-size cover
    min-width 1200px
.login
    position absolute
    top 50%
    left 50%
    transform translateX(-50%) translateY(-50%)
    width 1010px
    height 450px
    background-image url('~assets/images/bg-centent.png')
    border-radius 10px
    display flex
    .column
        width 50%
.login-form
    padding 50px 40px
    .tabs
        display flex
        cursor pointer
        &>.item
            width 50%
            font-size 18px
            color rgba(255, 255, 255, 0.45)
            text-align center
            &:first-child
                border-right 2px solid #fff
            &.active
                color #fff
    .form
        margin-top 40px
        .form-item
            margin 20px 10px
            display flex
            justify-content space-between
            .captcha-img
                height 43px
                align-self flex-end
    .btn-login
        margin 40px 10px
        height 48px
        line-height 50px
        color #ffffff
        background-color #d61e27
        font-size 18px
        border-radius 5px
        text-align center
        cursor pointer
</style>
