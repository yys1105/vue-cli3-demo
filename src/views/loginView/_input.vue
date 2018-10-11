<!-- 登录页面的输入框 -->
<template>
    <div class="self-input-wrap">
        <div class="self-input">
            <div class="icon">
                <img :src="icon" alt="">
            </div>
        <input :type="type" :value="value" @change="changeValue" :placeholder="placeholder">
        </div>
    </div>
</template>

<script>
export default {
  props: {
    icon: String,
    placeholder: String,
    value: String,
    type: {
      type: String,
      default: "text"
    }
  },
  data() {
    return {};
  },

  components: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {
    changeValue(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>
<style lang="stylus" scoped>
.self-input-wrap
    width 100%
    position relative
    .self-input
        border 2px solid #e2e2e2
        border-radius 5px
        height 40px
        background #fff
        color #c0c4cc
        padding 0 0 0 55px
        .icon
            position absolute
            top 0
            left 0
            bottom 0
            width 43px
        input
            height 38px
            width 100%
            border none
            outline none
</style>
