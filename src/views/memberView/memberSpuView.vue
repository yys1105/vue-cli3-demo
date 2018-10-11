<template>
  <div>
    <div class="head">
      <div class="name">
        <div class="text">{{data.cardname}}</div>
        <div class="num">
          <span class="link">{{data.currProductNum1+data.currProductNum2}}</span>/ <span>{{data.maxProductNum1+data.maxProductNum2}}</span>
        </div>
      </div>
      <div class="details">
        <div class="item">
          会员卡号：{{data.cardcode}}
        </div>
        <div class="item">
          公司名称：{{data.cardname}}
        </div>
        <div class="item">
          联系电话：{{data.phone2}}
        </div>
      </div>
    </div>
    <div class="main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="`通用类产品（${data.currProductNum1}/${data.maxProductNum1}）`" name="universal">
          <spu-list type="1"></spu-list>
        </el-tab-pane>
        <el-tab-pane :label="`个性类产品（${data.currProductNum2}/${data.maxProductNum2}）`" name="personality">
          <spu-list type="2"></spu-list>
        </el-tab-pane>
      </el-tabs>
    </div>
    
  </div>
</template>

<script>
import storejs from "storejs";
import SpuList from "./_spuList";
export default {
  name: "memberSpuView",
  data() {
    return {
      data: storejs("currentHy"),
      activeName: "universal"
    };
  },

  components: { SpuList },

  computed: {},

  created() {},

  mounted() {},

  methods: {
    handleClick(status) {}
  }
};
</script>
<style lang="stylus" scoped>
.head
  padding 25px 15px
  border 1px solid #e2e2e2
  .name
    display flex
    align-items center
    margin-bottom 10px
    .text
      font-size 20px
      font-weight 600
      margin-right 20px
  .details
    display flex
    align-items center
    .item
      height 40px
      line-height 40px
      margin-right 50px
.main
  padding 20px 15px
.link
  color #409EFF
  cursor pointer
</style>
