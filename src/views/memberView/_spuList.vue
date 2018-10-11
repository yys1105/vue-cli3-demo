<template>
  <div>
    <search-panel :searchParams.sync="searchParams" :searchOption="searchOption" @search="search">
        <div slot="right" v-if="this.type != 1">
            <el-button size="small" type="primary">设置可售</el-button>
            <el-button size="small">取消可售</el-button>
        </div>
    </search-panel>
    <table-e :datas="tableData.list" :counts='tableData.count' name="spuList" storeName="spuList" :headers="headers" :select="this.type != 1" @selectChange="selectChange">
        <template slot-scope="props">

            <div v-if="props.tplName=='saleable'">
              <div :class="props.row.saleable=='1'?'success':'fail'">
                {{props.row.uIfvalid=='1'?'销售中':'未销售'}}
              </div>
            </div>

            <div v-if="props.tplName=='memberNum'">
              {{props.row.currMemberNum}}/{{props.row.maxMemberNum}}
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
      type: String,
      default: "1"
    }
  },
  data() {
    const headers = [
      { label: "商品编码", labelName: "code", type: "data", width: 180 },
      {
        label: "商品类型",
        labelName: "categoryName",
        type: "data",
        width: 180
      },
      { label: "商品名称", labelName: "name", type: "data" },
      { label: "单品信息", labelName: "u_Type", type: "data", width: 180 },
      {
        label: "状态",
        labelName: "saleable",
        type: "comps",
        tplName: "saleable",
        width: 180
      },
      { label: "在售会员", labelName: "memberNum", type: "data", width: 180 }
    ];
    return {
      searchParams: {
        productCode: "",
        productName: "",
        type: this.type
      },
      searchOption: [
        {
          label: "商品编码:",
          key: "productCode"
        },
        {
          label: "商品名称:",
          key: "productName"
        }
      ],
      headers:
        this.type == 1
          ? [...headers]
          : [
              ...headers,
              {
                label: "操作",
                labelName: "operation",
                type: "data",
                width: 180
              }
            ]
    };
  },

  components: {},

  computed: {
    ...mapGetters({
      tableData: "spuList/data"
    })
  },

  created() {
    this.getList(this.searchParams);
  },

  mounted() {},

  methods: {
    ...mapActions({
      getList: "spuList/getList"
    }),
    search() {
      this.getList(this.searchParams);
    },
    selectChange(list) {}
  }
};
</script>
<style lang="stylus" scoped>
.success
    color #52c41a
.fail
    color #f5222d
</style>
