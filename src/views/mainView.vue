<template>
    <div>
        <header-menu :key="menuKey"></header-menu>
        <div style="min-width:1200px;">
          <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
  name: "module-view",
  data: function() {
    return {
      menuKey: false
    };
  },
  computed: {},
  created: function() {},
  mounted: function() {},
  methods: {},
  components: {},
  watch: {
    $route () {
      this.menuKey = !this.menuKey
     }
  }
};
</script>
<style>
</style>