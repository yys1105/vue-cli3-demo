<template>
  <div>
    <search-panel :searchParams.sync="searchParams" :searchOption="searchOption" @search="setTableData"></search-panel>
    <table-e :datas="tableData.list" :counts='tableData.count' name="providerSpuMember" storeName="providerSpuMember" :headers="headers" simplePagination select @selectChange="selectChange"></table-e>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    productId: {
      type: String | Number,
      default: ""
    },
    type: {
      type: Number,
      default: 1
    },
    singleOpr: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      searchParams: {
        productId: this.productId,
        cardCode: "",
        cardName: "",
        type: this.type,
        selectType: 1
      },
      searchOption: [
        { label: "会员编码:", key: "cardCode" },
        { label: "会员名称:", key: "cardName" }
      ],
      headers: [
        {
          label: "会员编码",
          labelName: "cardcode",
          type: "data"
        },
        {
          label: "会员名称",
          labelName: "cardname",
          type: "data"
        }
      ],
      tableData: {
        list: [],
        count: 0
      }
    };
  },

  components: {},

  computed: {
    // ...mapGetters({
    //   tableData: "providerSpuMember/data"
    // })
  },

  created() {
    this.setTableData();
  },

  mounted() {},

  methods: {
    ...mapActions({
      getList: "providerSpuMember/getList"
    }),
    async setTableData() {
      let res = await this.getList(this.searchParams);
      this.tableData = {
        list: res.data.docs,
        count: res.data.count
      };
    },
    selectChange(one, list) {
      this.$emit('selectChange',list)
    },
  }
};
</script>
<style>
</style>