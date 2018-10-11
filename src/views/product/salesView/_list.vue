<template>
  <div>
    <search-panel :searchParams.sync="searchParams" :searchOption="searchOption" @search="search">
        <div slot="right">
            <el-button type="primary" size="small" @click="showMaxNumBatch">批量设置上限</el-button>
            <el-button type="primary" size="small" v-if="type==2" @click="showMemBatch">批量设置可售</el-button>
        </div>
        
    </search-panel>
    <table-e :datas="tableData.list" :counts='tableData.count' name="providerSpuList" storeName="providerSpuList" :headers="headers" select @selectChange="selectChange">
        <template slot-scope="props">

            <div v-if="props.tplName=='currMemberNum'" style="text-align:center;">
                {{props.row.currMemberNum}}/{{props.row.maxMemberNum==-1?'--':props.row.maxMemberNum}}
            </div>

            <div v-if="props.tplName=='operation'">
                <el-button type="text" @click="showMaxNumDialog(props.row)">设置可售会员上限</el-button>
                <el-button type="text" v-if="type==2" @click="showMemDialog(props.row)">设置可售会员</el-button>
            </div>

        </template>
    </table-e>
    <max-num-dialog :visible.sync="mVisible" v-if="mVisible" :data="currentData" :datas="selectedList" :singleOpr="singleOpr" @success="search"></max-num-dialog>
    <member-dialog :visible.sync="uVisible" v-if="uVisible" :data="currentData" :datas="selectedList" :singleOpr="singleOpr"></member-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MaxNumDialog from "./_maxNumDialog";
import MemberDialog from "./_memberDialog";
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
        { label: "产品名称", labelName: "name", type: "data", width: 250 },
        { label: "描述", labelName: "productDesc", type: "data" },
        {
          label: "在售会员数量",
          labelName: "currMemberNum",
          tplName: "currMemberNum",
          type: "comps",
          width: 180
        },
        {
          label: "操作",
          labelName: "operation",
          tplName: "operation",
          type: "comps",
          width: this.type == 1 ? 140 : 250
        }
      ],
      mVisible: false,
      currentData: {},
      selectedList: [],
      singleOpr: true,
      uVisible: false
    };
  },

  components: { MaxNumDialog, MemberDialog },

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
      getList: "providerSpuList/getList"
    }),
    search() {
      this.getList(this.searchParams);
    },
    showMaxNumDialog(row) {
      this.currentData = row;
      this.singleOpr = true;
      this.mVisible = true;
    },
    showMaxNumBatch() {
      if (!this.selectedList.length) {
        this.$message.warning("请至少选中一条数据");
        return false;
      }
      this.singleOpr = false;
      this.mVisible = true;
    },
    selectChange(one, list) {
      this.selectedList = list;
    },
    showMemDialog(row) {
      this.currentData = row;
      this.singleOpr = true;
      this.uVisible = true;
    },
    showMemBatch() {
      if (!this.selectedList.length) {
        this.$message.warning("请至少选中一条数据");
        return false;
      }
      this.singleOpr = false;
      this.uVisible = true;
    }
  }
};
</script>
<style>
</style>