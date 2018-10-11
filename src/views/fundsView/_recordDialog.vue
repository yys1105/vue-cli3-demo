<template>
    <el-dialog title="提现" :visible="dialogVisible" @update:visible="updateVisible" width="900px" :lock-scroll="true">
        <table-e :datas="tableData.list" :counts='tableData.count' name="order" storeName="order" :headers="headers">
            <template slot-scope="props">
                <div v-if="props.tplName=='sum'" style="text-align:center;">
                    {{num2money(props.row.u_Poundage+props.row.u_TraAmount)}}
                </div>
                <div v-if="props.tplName=='u_PaymentStatus'" style="text-align:center;">
                    {{props.row.u_PaymentStatus=='0'?'回款中':props.row.u_PaymentStatus=='-1'?'回款失败':'回款成功'}}
                </div>
            </template>
        </table-e>
    </el-dialog>
</template>

<script>
import dialog from "@/components/dialog/dialog.js";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [dialog],
  data() {
    return {
      headers: [
        {
          label: "提现日期",
          labelName: "createDate",
          type: "data",
          width: 200
        },
        {
          label: "提现会员编码",
          labelName: "shortName",
          type: "data",
          width: 120
        },
        {
          label: "提现申请金额",
          labelName: "sum",
          type: "comps",
          tplName: "sum",
          width: 120
        },
        {
          label: "提现手续费金额",
          labelName: "u_Poundage",
          type: "money",
          width: 120
        },
        {
          label: "提现实际到账金额",
          labelName: "u_TraAmount",
          type: "money",
          width: 200
        },
        {
          label: "提现状态",
          labelName: "u_PaymentStatus",
          type: "comps",
          tplName: "u_PaymentStatus"
        },
        { label: "驳回原因", labelName: "u_Reason", type: "data", width: 200 }
      ]
    };
  },

  components: {},

  computed: {
    ...mapGetters({
      tableData: "accountRetrieve/data"
    })
  },

  created() {
    this.get();
  },

  mounted() {},

  methods: {
    ...mapActions({
      get: "accountRetrieve/getByParams"
    })
  }
};
</script>
<style>
</style>