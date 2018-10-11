<template>
  <div>
    <search-panel :searchParams.sync="searchParams" :searchOption="searchOption" @search="search">
        <el-button type="primary" size="small" slot="right" @click="setTypeBatch">{{type==1?'设为个性类产品':'设为通用类产品'}}</el-button>
    </search-panel>
    <table-e :datas="tableData.list" :counts='tableData.count' name="providerSpuList" storeName="providerSpuList" :headers="headers" select @selectChange="selectChange">
        <template slot-scope="props">

            <div v-if="props.tplName=='currMemberNum'" style="text-align:center;">
                {{props.row.currMemberNum}}/{{props.row.maxMemberNum==-1?'--':props.row.maxMemberNum}}
            </div>

            <div v-if="props.tplName=='operation'">
                <el-button type="text" @click="setTypeOne(props.row)">{{type==1?'设为个性类产品':'设为通用类产品'}}</el-button>
            </div>

        </template>
    </table-e>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      searchParams: {
        productCode: "",
        productName: "",
        type: this.type,
        firstCategoryId: "",
        secondCategoryId: "",
        categoryId: ""
      },
      searchOption: [
        { label: "商品编码:", key: "productCode" },
        { label: "商品名称:", key: "productName" },
        {
          label: "商品分类:",
          keys: ["firstCategoryId", "secondCategoryId", "categoryId"],
          type: "category"
        }
      ],
      headers: [
        { label: "产品编码", labelName: "code", type: "data", width: 180 },
        {
          label: "产品分类",
          labelName: "categoryName",
          type: "data",
          width: 180
        },
        { label: "产品名称", labelName: "name", type: "data", width: 250 },
        {
          label: "单品信息",
          labelName: "cnt",
          type: "data"
        },
        {
          label: "上架时间",
          labelName: "online_date",
          type: "data",
          width: 250
        },
        {
          label: "操作",
          labelName: "operation",
          tplName: "operation",
          type: "comps",
          width: 140
        }
      ],
      selectedList: []
    };
  },

  components: {},

  computed: {
    ...mapGetters({
      tableData: "providerSpuList/data"
    })
  },

  created() {
    this.getList(this.searchParams);
  },

  mounted() {},

  methods: {
    ...mapActions({
      getList: "providerSpuList/getList",
      typePut: "providerSpuType/put"
    }),
    search() {
      this.getList(this.searchParams);
    },
    async setTypeBatch() {
      if (!this.selectedList.length) {
        this.$message.warning("请至少选中一条数据");
        return false;
      }
      let submitData = this.selectedList.map(item => {
        return {
          productCode: item.code,
          productId: item.id,
          type: this.type == 1 ? 2 : 1
        };
      });
      let res = await this.typePut(submitData)
      this.$message.success(res.msg);
      this.getList(this.searchParams);
    },
    selectChange(one, list) {
      this.selectedList = list;
    },
    async setTypeOne(row) {
      let res = await this.typePut([
        {
          productCode: row.code,
          productId: row.id,
          type: this.type == 1 ? 2 : 1
        }
      ]);
      this.$message.success(res.msg);
      this.getList(this.searchParams);
    }
  }
};
</script>
<style>
</style>