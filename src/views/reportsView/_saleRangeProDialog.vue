<template>
    <el-dialog title="可售会员" :visible="dialogVisible" @update:visible="updateVisible" width="800px" :lock-scroll="true">
        <search-panel :searchParams.sync="searchParams" :searchOption="searchOption" @search="search">
        </search-panel>
        <table-e :datas="tableData.list" :counts='tableData.count' name="spuMember" storeName="spuMember" :headers="headers"></table-e>
    </el-dialog>
</template>

<script>
import dialog from "@/components/dialog/dialog.js";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [dialog],
  props: {
    products: {
      type: Array,
      default: function() {
        return [];
      }
    },
    type: {
      type: Number,
      default: 1
    }, //类型 1：可售会员，2：禁售会员
    selectType: {
      type: Number,
      default: 1
    } //选择方式标识：可售查询时：单选1 多选2
  },
  data() {
    return {
      searchParams: {
        productId: this.selectType == 1 ? this.products[0].id : "",
        cardCode: "",
        cardName: "",
        type: this.type,
        selectType: this.selectType
      },
      searchOption: [
        { label: "会员编码:", key: "cardCode" },
        { label: "会员名称:", key: "cardName" }
      ],
      headers: [
        { label: "会员编码", labelName: "cardcode", type: "data" },
        { label: "会员名称", labelName: "cardname", type: "data" }
      ]
    };
  },

  components: {},

  computed: {
    ...mapGetters({
      tableData: "spuMember/data"
    })
  },

  created() {
    this.getList(this.searchParams);
  },

  mounted() {},

  methods: {
    ...mapActions({
      getList: "spuMember/getList"
    }),
    search() {
      this.getList(this.searchParams);
    }
  }
};
</script>
<style>
</style>