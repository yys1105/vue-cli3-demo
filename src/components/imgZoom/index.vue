<template>
  <div class="mini-img-wrap">
      <img :src="src" :alt="alt" @click="showBigImg">
      <div class="mask" v-if="showBig" @click="hideBigImg">
          <div class="big-img-wrap">
              <img :src="src" :alt="alt">
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    alt: String
  },
  data() {
    return {
      showBig: false
    };
  },

  components: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {
    showBigImg() {
      this.showBig = true;
    },
    hideBigImg() {
      this.showBig = false;
    }
  }
};
</script>
<style lang="stylus" scoped>
.mini-img-wrap
  display inline-block
  height 100%
  &>img
    width auto
    height 100%
.mask
  position fixed
  left 0
  top 0
  right 0
  bottom 0
  z-index 999
  background-color rgba(0, 0, 0, 0.3)
  .big-img-wrap
    width 100%
    height 100%
    overflow-y auto
    position relative
    &> img
      position absolute
      left 50%
      top 50%
      max-width 1200px
      transform translateY(-50%) translateX(-50%)
</style>
