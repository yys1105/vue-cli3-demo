<!--  -->
<template>
  <div class="content">
      <el-tabs v-model="activeName">
          <el-tab-pane name="currency">
            <span slot="label" class="tab-label">通用类产品</span>
            <list v-if="activeName=='currency'" :type="1"></list>
        </el-tab-pane>
        <el-tab-pane name="personality">
            <span slot="label" class="tab-label">个性类产品</span>
            <list v-if="activeName=='personality'" :type="2"></list>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import list from "./_list";
export default {
  data() {
    return {
      activeName: "currency"
    };
  },

  components: { list },

  computed: {},

  created() {},

  mounted() {},

  methods: {}
};
</script>
<style lang="stylus" scoped>
.tab-label
    font-size 16px
</style>
