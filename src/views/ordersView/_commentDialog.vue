<template>
  <el-dialog title="查看评价" :visible="dialogVisible" @update:visible="updateVisible" width="500px" :lock-scroll="true">
    <el-form>
      <el-form-item label="服务评价:">
        <el-rate style="height:40px;padding-top:10px;" v-model="evaluate.score" disabled text-color="#ff9900">
        </el-rate>
      </el-form-item>
      <el-form-item label="评价详情:">
        <div>{{evaluate.detail}}</div>
        <div class="img-list-wrap">
          <div class="img-item" v-for="(item, index) in evaluate.imgUrls" :key="index">
            <img-zoom class="img" :src="item"></img-zoom>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <slot name="footer">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary" @click="confirm">确 定</el-button>
      </slot>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    evaluate: {
      type: Object,
      default: function() {
        return {};
      }
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
      this.updateVisible(false);
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