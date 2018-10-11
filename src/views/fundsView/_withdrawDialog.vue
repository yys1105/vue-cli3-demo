<template>
  <el-dialog title="提现" :visible="dialogVisible" @update:visible="updateVisible" width="520px" :lock-scroll="true">
    <el-form label-width="80px">
      <el-form-item label="账户余额:">{{accountInfo.balanceInfo&&accountInfo.balanceInfo.balance}}元</el-form-item>
      <el-form-item label="提现金额:">
        <el-input v-model.number="withdraw.num" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input v-model="withdraw.remark" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import dialog from "@/components/dialog/dialog.js";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [dialog],
  props: {
    accountInfo: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      withdraw: {
        num: "",
        remark: ""
      }
    };
  },

  components: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {
    ...mapActions({
      post: "accountRetrieve/post"
    }),
    async confirm() {
      if (!this.withdraw.num) {
        this.$message.warning("请填写提现金额");
        return false;
      }
      let res = await this.post({
        u_TraAmount: this.withdraw.num * 100,
        memo: this.withdraw.remark
      });
      this.$message.success(res.msg);
      this.updateVisible(false);
    }
  }
};
</script>
<style>
</style>