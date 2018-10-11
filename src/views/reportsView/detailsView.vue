<template>
  <div class="content">
    <search-panel :searchParams.sync="searchParams" :searchOption="searchOption" @search="search">
      <el-button @click="$router.go(-1)" size="small" slot="right">返回</el-button>
    </search-panel>
    <table-e :datas="tableData.list" :counts='tableData.count' name="providerPrice" storeName="providerPrice" :headers="headers">
      <template slot-scope="props">
        <div v-if="props.tplName=='filelist'" style="text-align:center;">
          <img style="width:80px;" :src="props.row.FILELIST||tempimg | imgSize(80,80)">
        </div>
        <div v-if="props.tplName=='info'" style="text-align:center;">
          <div v-if="props.row.Spec">规格：{{props.row.Spec}}</div>
          <div v-if="props.row.U_Series">系列：{{props.row.U_Series}}</div>
          <div v-if="props.row.U_MQuality">材质：{{props.row.U_MQuality}}</div>
        </div>
        <div v-if="props.tplName=='opr'" style="text-align:center;">
          <el-button size="small" @click="setRate(props.row)">编辑</el-button>
        </div>
      </template>
    </table-e>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import tempimg from "@/assets/images/temp.jpg";
export default {
  data() {
    return {
      tempimg,
      searchParams: {
        productId: this.$route.params.id,
        itemcode: "",
        itemname: "",
        itmsgrpcod: "",
        firmcode: "",
        code: "",
        uBrand: "",
        uModle: "",
        uMQuality: "",
        uSeries: "",
        spec: ""
      },
      searchOption: [
        { label: "商品编码:", key: "itemcode" },
        { label: "商品名称:", key: "itemname" },
        {
          label: "商品分类:",
          keys: ["itmsgrpcod", "firmcode", "code"],
          type: "category"
        },
        { label: "产品品牌:", key: "uBrand" },
        { label: "产品型号:", key: "uModle" },
        { label: "产品材质:", key: "uMQuality" },
        { label: "产品系列:", key: "uSeries" },
        { label: "产品规格:", key: "spec" }
      ],
      headers: [
        {
          label: "产品编号",
          labelName: "ItemCode",
          type: "data",
          width: "200px"
        },
        {
          label: "产品图片",
          labelName: "filelist",
          type: "comps",
          tplName: "filelist",
          width: "150px"
        },
        {
          label: "产品名称",
          labelName: "ItemName",
          type: "data",
          width: "200px"
        },
        {
          label: "产品分类",
          labelName: "code",
          type: "data",
          width: "250px"
        },
        {
          label: "产品型号",
          labelName: "U_Modle",
          type: "data",
          width: "150px"
        },
        {
          label: "产品其他信息",
          labelName: "info",
          type: "comps",
          tplName: "info",
          width: "150px"
        },
        {
          label: "标准价格",
          labelName: "standPrice",
          type: "money",
          width: "100px"
        },
        {
          label: "服务商价",
          labelName: "facilitatorPrice",
          type: "money",
          width: "100px"
        },
        {
          label: "终端零售价",
          labelName: "ratePrice",
          type: "money",
          width: "100px"
        },{
          label: "干线费用",
          labelName: "mainlineCost",
          type: "money",
          width: "100px"
        },
        {
          label: "会员所属服务商的服务费",
          mulHead: true,
          children: [
            {
              label: "仓储费",
              labelName: "s2bprice8",
              type: "money",
              width: "100px"
            },
            {
              label: "人员工资及固定资产费（自有）",
              labelName: "s2bprice10",
              type: "money",
              width: "150px"
            },
            {
              label: "售后费",
              labelName: "s2bprice11",
              type: "money",
              width: "100px"
            }
          ]
        },
        {
          label: "均摊服务费",
          mulHead: true,
          children: [
            {
              label: "周转仓费",
              labelName: "s2sprice3",
              type: "money",
              width: "100px"
            },
            {
              label: "人员工资及固定资产费（周转）",
              labelName: "s2sprice4",
              type: "money",
              width: "150px"
            }
          ]
        }
      ],
      selectedList: [],
      products: []
    };
  },

  components: {},

  computed: {
    ...mapGetters({
      tableData: "providerPrice/data"
    })
  },

  created() {
    this.getList(this.searchParams);
  },

  mounted() {},

  methods: {
    ...mapActions({
      getList: "providerPrice/getList"
    }),
    search() {
      this.getList(this.searchParams);
    },
    setRate(row) {}
  }
};
</script>
<style>
</style>