<template>
  <el-dialog
    title="可售会员上限"
    :visible="dialogVisible"
    @update:visible="updateVisible"
    width="400px"
    :lock-scroll="true">
    <el-form :model="form">
        <el-form-item label="可售会员数">
            <el-input-number v-model="form.num" :min="0"></el-input-number>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <slot name="footer">
            <el-button size="small" @click="updateVisible(false)">取 消</el-button>
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
    singleOpr: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: function() {
        return {};
      }
    },
    datas: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      form: {
        num: this.singleOpr ? this.data.maxMemberNum : 0
      }
    };
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
    ...mapActions({
      put: "providerFacilitatorMaxmember/put"
    }),
    updateVisible(event) {
      this.$emit("update:visible", event);
    },
    async confirm() {
      let values = this.singleOpr
        ? [
            {
              maxMember: this.form.num,
              productId: this.data.id,
              productCode: this.data.code
            }
          ]
        : this.datas.map(item => {
            return {
              maxMember: this.form.num,
              productId: item.id,
              productCode: item.code
            };
          });
      let res = await this.put({
        values
      });
      this.$message.success(res.msg);
      this.updateVisible(false);
      this.$emit("success");
    }
  }
};
</script>
<style>
</style>