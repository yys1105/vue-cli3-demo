<!-- menu -->
<template>
  <div class="header">
    <div class="logo">
      {{info.companyName}}
    </div>
    <div class="menu">
      <div class="menu-item" :class="{active:item.active}" v-for="(item,index) in menus" :key="index" @click="goTo(item)">
        <span>{{item.name}}</span>
        <div class="submenu">
          <div v-for="(sub,i) in item.subMenus" :key="i" :class="{active:sub.active}" @click="toSubMenus(sub)">
            <span>{{sub.name}}</span>
          </div>
        </div>
      </div>
      <div class="login">
        <i class="iconfont icon-touxiang"></i>
        <span>管理员</span>
        <div class="submenu">
          <div @click='$router.push({ path: "/funds" })'>
            <i class="iconfont icon-zhanghu"></i>账户信息</div>
          <div @click="pVisibel=true">
            <i class="iconfont icon-mima"></i>修改密码</div>
          <div @click="loginout">
            <i class="iconfont icon-tuichu"></i>退出登录</div>
        </div>
      </div>
    </div>
    <password-dialog :visible.sync="pVisibel"></password-dialog>
  </div>
</template>

<script>
import menus from "@/portal/menus/menus.json";
import store from "storejs";
import { mapGetters, mapActions } from "vuex";
import PasswordDialog from "./_passwordDialog";
export default {
  name: "HeaderMenu",
  data() {
    return {
      menus,
      info: store.get("member"),
      pVisibel: false
    };
  },

  components: { PasswordDialog },

  computed: {},

  created() {
    var path = this.$route.path;
    this.menus = this.menus.map(item => {
      item.active =
        path.indexOf(item.url && item.url.split("/")[1]) > -1 ? true : false;
      (item.subMenus || []).map(x => {
        x.active = path.indexOf(x.url) > -1 ? true : false;
        return x;
      });
      return item;
    });
  },

  mounted() {},

  methods: {
    ...mapActions({
      logout: "logout/post"
    }),
    goTo(route) {
      if (!route.subMenus) {
        this.$router.push({ path: route.url });
      }
    },
    toSubMenus(sub) {
      this.$router.push({ path: sub.url });
    },
    async loginout() {
      await this.$confirm("确定要退出登录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
      this.logout();
      store.remove("member");
      store.remove("token");
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
<style lang="stylus" scoped>
.header
  background-color #333744
  height 60px
  padding 0 20px
  min-width 1200px
  .logo
    float left
    margin-right 10px
    display flex
    line-height 60px
    color #ffffff
    font-size 20px
  .menu
    float right
    display flex
    flex-direction row
    align-content center
    .menu-item
      position relative
      height 60px
      line-height 60px
      width 125px
      text-align center
      border-left 1px solid #000b2e
      color #fff
      cursor pointer
      &.active
        background-color #000b2e
      &:hover .submenu
        display block
        &>.active
          background-color #e2e2e2
          color #409EFF
      .submenu
        display none
        position absolute
        top 60px
        left 0
        right 0
        z-index 99
        background-color #fff
        box-shadow 0 0 2px #ccc
        border-radius 2px
        color #303133
        line-height 41px
        &>div:hover
          background-color #409EFF
          color #fff
        &.active
          background-color #e4e8f1
          color #409eff
    .login
      display flex
      color #ffffff
      line-height 60px
      width 118px
      border-left 1px solid #000b2e
      position relative
      &>.iconfont
        font-size 30px
        margin 0 10px 0 20px
      &:hover .submenu
        display block
      .submenu
        display none
        position absolute
        top 60px
        left 0
        right -20px
        z-index 99
        background-color #fff
        box-shadow 0 0 2px #ccc
        border-radius 2px
        color #303133
        line-height 41px
        &>div
          height 41px
          line-height 41px
          text-align center
          color #303133
          font-size 14px
          cursor pointer
          &>.iconfont
            margin-right 5px
</style>
