<template>
  <div id="app" v-loading='load'>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      load: false
    };
  },
  mounted() {
    this.$event.$on("errorNetWork", msg => {
      this.$message.error(msg);
    });

    this.$event.$on("actionload", flag => {
      this.load = flag;
    });
  }
};
</script>
<style>
@import "//at.alicdn.com/t/font_826095_dsc4gde5im9.css";
#app{
  font-size: 14px;
}
.content{
  margin: 0 20px;
}
</style>

