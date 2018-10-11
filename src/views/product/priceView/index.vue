<!--  -->
<template>
  <div class="content">
    <search-panel :searchParams.sync="searchParams" :searchOption="searchOption" @search="search">
      <el-button type="primary" slot="right" size="small" @click="setHot">设为爆款</el-button>
    </search-panel>
    <table-e :datas="tableData.list" :counts='tableData.count' name="providerFgross" storeName="providerFgross" :headers="headers" select @selectChange="(one,list)=>selectedList = list">
      <template slot-scope="props">

        <div v-if="props.tplName=='FILELIST'" class="img-wrapper">
          <span class="icon iconfont icon-baokuan" v-if="props.row.ishot==1"></span>
          <img class="img" :src="props.row.FILELIST||tempimg | imgSize(80,80)">
        </div>

        <div v-if="props.tplName=='info'">
          <div v-if="props.row.Spec">规格：{{props.row.Spec}}</div>
          <div v-if="props.row.U_Series">系列：{{props.row.U_Series}}</div>
          <div v-if="props.row.U_MQuality">材质：{{props.row.U_MQuality}}</div>
          <div v-if="props.row.U_UnitPackModel">包装规格：{{props.row.U_UnitPackModel}}</div>
          <div v-if="props.row.SalUnitMsr">单位：{{props.row.SalUnitMsr}}</div>
        </div>
        <div v-if="props.tplName=='facilitatorGross'">
          <span v-if="props.row.facilitatorGross">{{`${props.row.facilitatorGross}%`}}</span>
        </div>
        <div v-if="props.tplName=='salGross'">
          <span v-if="props.row.salGross">{{props.row.salGross}}%</span>
        </div>
        <div v-if="props.tplName=='operation'">
          <el-button type="text" @click="editOne(props.row)">编辑</el-button>
        </div>

      </template>
    </table-e>
    <price-set :visible.sync="sVisible" v-if="sVisible" :data="currentData" @success="search"></price-set>
  </div>
</template>

<script>
import tempimg from "@/assets/images/temp.jpg";
import { mapGetters, mapActions } from "vuex";
import PriceSet from "./_set";
export default {
  data() {
    return {
      tempimg,
      searchParams: {
        itemcode: "",
        itemname: "",
        itmsgrpcod: "",
        firmcode: "",
        code: ""
      },
      searchOption: [
        { label: "商品编码:", key: "itemcode" },
        { label: "商品名称:", key: "itemname" },
        {
          label: "商品分类:",
          keys: ["itmsgrpcod", "firmcode", "code"],
          type: "category"
        }
      ],
      headers: [
        { label: "产品编码", labelName: "ItemCode", type: "data", width: 180 },
        {
          label: "产品图片",
          labelName: "FILELIST",
          tplName: "FILELIST",
          type: "comps",
          width: 90
        },
        { label: "产品名称", labelName: "ItemName", type: "data", width: 230 },
        {
          label: "产品分类",
          labelName: "ItmsGrpNam",
          type: "data",
          width: 180
        },
        { label: "产品型号", labelName: "U_Modle", type: "data", width: 200 },
        {
          label: "产品其他类型",
          labelName: "info",
          tplName: "info",
          type: "comps",
          width: 180
        },
        { label: "标准价", labelName: "standPrice", type: "money", width: 180 },
        {
          label: "毛利率",
          labelName: "facilitatorGross",
          type: "comps",
          tplName: "facilitatorGross",
          width: 80
        },
        {
          label: "服务商价",
          labelName: "facilitatorPrice",
          type: "money",
          width: 180
        },
        {
          label: "销售价毛利率",
          labelName: "salGross",
          type: "comps",
          tplName: "salGross",
          width: 80
        },
        { label: "销售价", labelName: "ratePrice", type: "money", width: 180 },
        {
          label: "操作",
          labelName: "operation",
          tplName: "operation",
          type: "comps",
          width: 60
        }
      ],
      selectedList: [],
      sVisible: false,
      currentData: {}
    };
  },

  components: { PriceSet },

  computed: {
    ...mapGetters({
      tableData: "providerFgross/data"
    })
  },

  created() {
    this.getList(this.searchParams);
  },

  mounted() {},

  methods: {
    ...mapActions({
      getList: "providerFgross/getList",
      hostPost: "providerFgross/post"
    }),
    search() {
      this.getList(this.searchParams);
    },
    async setHot() {
      if (!this.selectedList.length) {
        this.$message.warning("请至少选中一条数据");
        return false;
      }
      let submitData = this.selectedList.map(item => {
        return {
          ishot: 1,
          itemcode: item.ItemCode
        };
      });
      let res = await this.hostPost(submitData);
      this.$message.success(res.msg);
      this.getList(this.searchParams);
    },
    editOne(row) {
      this.sVisible = true;
      this.currentData = row;
    }
  }
};
</script>
<style lang="stylus" scoped>
.img-wrapper
  width 80px
  height 80px
  text-align center
  position relative
  &>.img
    max-width 100%
    max-height 100%
  .icon
    position absolute
    right 0
    top 11px
    font-size 40px
    color red
</style>
