<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    @update:visible="updateVisible"
    :width="width"
    :lock-scroll="true">
    <div v-if="dialogVisible">
        <slot></slot>
    </div>
    <span slot="footer" class="dialog-footer">
        <slot name="footer">
            <el-button size="small" @click="cancel">取 消</el-button>
            <el-button size="small" type="primary" @click="confirm">确 定</el-button>
        </slot>
    </span>
    </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 200
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    fullscreen: {
      type: String,
      default: false
    }
  },
  data() {
    return {};
  },

  components: {},

  computed: {
    dialogVisible() {
      return this.visible;
    }
  },

  created() {},

  mounted() {},

  methods: {
    updateVisible(event) {
      this.$emit("update:visible", event);
    },
    confirm() {
      this.$emit("comfirm");
    },
    cancel() {
      this.$emit("cancel");
      this.updateVisible(false);
    }
  }
};
</script>
<style>
</style>