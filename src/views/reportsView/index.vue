<template>
  <div class="content">
    <search-panel :searchParams.sync="searchParams" :searchOption="searchOption" @search="search">
      <el-button size="small" slot="right" @click="btnExport">导出</el-button>
    </search-panel>
    <table-e :datas="tableData.list" :counts='tableData.count' name="reports" storeName="reports" :headers="headers">
      <template slot-scope="props">
        <div v-if="props.tplName=='sku'" style="text-align:center;">
          <el-button type="text" @click="checkSku(props.row)">查看</el-button>
        </div>
        <div v-if="props.tplName=='opr'" style="text-align:center;">
          <el-button type="text" @click="checkMem(props.row)">查看</el-button>
        </div>
      </template>
    </table-e>
    <sale-range-pro-dialog v-if="sVisible" :visible.sync="sVisible" :products="products" :type="1" :selectType="1">
    </sale-range-pro-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { exportCommon } from "@/utils";
import SaleRangeProDialog from "./_saleRangeProDialog";
export default {
  data() {
    return {
      searchParams: {
        productCode: "",
        productName: "",
        firstCategoryId: "",
        secondCategoryId: "",
        categoryId: "",
        brandName: "",
        productDesc: ""
      },
      searchOption: [
        { label: "商品编码:", key: "productCode" },
        { label: "商品名称:", key: "productName" },
        {
          label: "商品分类:",
          keys: ["firstCategoryId", "secondCategoryId", "categoryId"],
          type: "category"
        },
        { label: "商品品牌:", key: "brandName" },
        { label: "商品描述:", key: "productDesc" }
      ],
      headers: [
        {
          label: "商品编号",
          labelName: "code",
          type: "data",
          width: 190
        },
        {
          label: "商品分类",
          labelName: "categoryName",
          type: "data",
          width: 120
        },
        { label: "品牌", labelName: "brandName", type: "data", width: 100 },
        { label: "商品名称", labelName: "name", type: "data" },
        { label: "商品描述", labelName: "productDesc", type: "data" },
        {
          label: "SKU",
          labelName: "sku",
          type: "comps",
          tplName: "sku",
          width: 80
        },
        {
          label: "可售会员",
          labelName: "sku",
          type: "comps",
          tplName: "opr",
          width: 80
        }
      ],
      selectedList: [],
      products: [],
      sVisible: false
    };
  },

  components: { SaleRangeProDialog },

  computed: {
    ...mapGetters({
      tableData: "reports/data"
    })
  },

  created() {
    this.getList(this.searchParams);
  },

  mounted() {},

  methods: {
    ...mapActions({
      getList: "reports/getList"
    }),
    search() {
      this.getList(this.searchParams);
    },
    checkSku(row) {
      this.$router.push({ path: "/reports/" + row.id });
    },
    checkMem(row) {
      this.products = [row];
      this.sVisible = true;
    },
    async btnExport() {
      await exportCommon("provider/report/export", this.searchParams);
    }
  }
};
</script>
<style>
</style>