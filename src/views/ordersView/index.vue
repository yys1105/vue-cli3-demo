<!-- 会员管理 -->
<template>
  <div class="content">
    <search-panel :searchParams.sync="searchParams" :searchOption="searchOption" @search="search">
    </search-panel>
    <table-e :datas="tableData.list" :counts='tableData.count' name="order" storeName="order" :headers="headers">
      <template slot-scope="props">

        <div v-if="props.tplName=='orderNo'" style="text-align:center;">
          <el-button type="text" @click="$router.push('/orders/'+props.row.orderNo)">{{ props.row.orderNo }}</el-button>
        </div>

        <div v-if="props.tplName=='consInfo'">
          {{props.row.consName}}<br/>{{props.row.consMobile}}<br/>{{props.row.consAddress}}
        </div>

        <div v-if="props.tplName=='status'" style="text-align:center;">
          {{statusList.filter((item) => item.value===props.row.status)[0].label}}
        </div>

        <div v-if="props.tplName=='operation'" style="text-align:center;">
          <el-button v-if="props.row.status==13" type="text" @click="reviewComments(props.row)">查看评价</el-button>
          <el-button type="text" @click="checkLogistics(props.row)">查看物流</el-button>
        </div>

      </template>
    </table-e>
    <comment-dialog :visible.sync="cVisible" v-if="cVisible" :evaluate="evaluate"></comment-dialog>
    <logistics-dialog :visible.sync="lVisible" v-if="lVisible" :data="logistics"></logistics-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { statusList } from "@/utils/const.js";
import CommentDialog from "./_commentDialog";
import LogisticsDialog from "./_logisticsDialog";
import moduleEvent from "@/event/moduleEvent";
export default {
  data() {
    return {
      searchParams: {
        orderNo: "",
        status: "",
        createDtBt: "",
        consName: "",
        consMobile: "",
        consAddress: ""
      },
      searchOption: [
        { label: "订单编号:", key: "orderNo" },
        {
          label: "订单状态:",
          key: "status",
          type: "select",
          option: [
            {
              value: 13,
              label: "已完成",
              sub: "已完成"
            },
            {
              value: 7,
              label: "工厂接单",
              sub: "工厂接单"
            },
            {
              value: 12,
              label: "整单闭环",
              sub: "整单闭环"
            }
          ]
        },
        {
          label: "选择日期:",
          key: "createDtBt",
          type: "dateRange"
        },
        { label: "收货人:", key: "consName" },
        { label: "收货人电话:", key: "consMobile" },
        { label: "收货地址:", key: "consAddress" }
      ],
      headers: [
        {
          label: "订单编号",
          labelName: "orderNo",
          type: "comps",
          width: 190,
          tplName: "orderNo"
        },
        {
          label: "下单时间",
          labelName: "createAt",
          type: "datatime",
          width: 200
        },
        {
          label: "收货信息",
          labelName: "consInfo",
          type: "comps",
          tplName: "consInfo",
          width: 350
        },
        {
          label: "订单状态",
          labelName: "status",
          type: "comps",
          tplName: "status"
        },
        { label: "主材金额", labelName: "materialsExp", type: "money" },
        { label: "服务费金额", labelName: "serviceExp", type: "money" },
        { label: "干线运费", labelName: "uTrCost", type: "money" },
        {
          label: "操作",
          labelName: "operation",
          type: "comps",
          tplName: "operation",
          width: 200
        }
      ],
      statusList,
      cVisible: false,
      lVisible: false,
      logistics: [],
      currentData: {}
    };
  },

  components: { CommentDialog, LogisticsDialog },

  computed: {
    ...mapGetters({
      tableData: "order/data",
      evaluate: "evaluate/data"
    })
  },

  created() {
    this.getList(this.searchParams);
  },

  mounted() {},

  methods: {
    ...mapActions({
      getList: "order/getList",
      getEvaluate: "evaluate/getById",
      getLogistics: "logistics/getById"
    }),
    search() {
      this.getList(this.searchParams);
    },
    async reviewComments(row) {
      moduleEvent.$emit("actionload", true);
      await this.getEvaluate(row.orderNo);
      this.cVisible = true;
    },
    async checkLogistics(row) {
      // row.orderNo = "FZCG201710115374_103";
      moduleEvent.$emit("actionload", true);
      let res = await this.getLogistics(row.orderNo);
      this.logistics = res.data;
      moduleEvent.$emit("actionload", false);
      if (!res.data.length) {
        this.$message.warning("暂无物流信息");
        return;
      }
      this.lVisible = true;
    }
  }
};
</script>
<style>
</style>