<template>
  <div class="panel">
      <div class="header">
          <span class="icon iconfont" :class="icon">
          </span>
          <div class="title">{{title}}</div>
      </div>
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    icon: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },

  components: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {}
};
</script>
<style lang="stylus" scoped>
.panel
    border 1px solid #e2e2e2
    margin-bottom 20px
    .header
        display flex
        align-items center
        height 45px
        background-color rgba(247, 247, 247, 1)
        padding 13px 15px
        box-sizing border-box
        border-bottom 1px solid #e2e2e2
        .icon
            margin-right 10px
            font-size 20px
        .title 
            flex 1
    .content 
        padding 15px 20px
        
</style>
