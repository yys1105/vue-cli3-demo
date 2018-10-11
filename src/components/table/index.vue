<!-- table组件 -->
<template>
  <div v-loading="loading">
    <div class="table-e">
      <el-table :max-height="maxHeight" :key="name" :border="border" :highlight-current-row="highlight" :data="datas" :stripe="stripe" :show-header="showHeader" header-cell-class-name="table-header" @select="selectItem" @select-all="selectAll" @selection-change="selectionChange">

        <!--选择-->
        <el-table-column v-if="select" type="selection" :selectable="selectFun" width="55"></el-table-column>
        <!--序号-->
        <el-table-column v-if="index" type="index" width="55"></el-table-column>
        <!-- <el-table-column v-if="select" type="selection" :selectable="selectFun" width="55"></el-table-column> -->
        
        <el-table-column class="table-header" v-for="(one,index) in headers" :key="index" :render-header="one.renderHeader || renderHeader" :fixed="one.fixed" :label="one.label" :prop="one.labelName" :align='one.align' :type="one.type" :sortable="one.sortable" :width="one.width" :min-width="one.minWidth" v-if="!one.mulHead">
          <template slot-scope="scope">
            <div v-if="one.type=='comps'">
              <slot :row="scope.row" :tplName="one.tplName" :index="scope.$index" :val="scope.row[one.labelName]"></slot>
            </div>
            <div v-else-if="one.type=='money'" style="text-align:center;">
              {{scope.row[one.labelName]||0 | num2money}}
            </div>
            <div v-else-if="one.type=='date'" style="text-align:center;">
              {{scope.row[one.labelName] | dateFormate('yyyy-mm-dd')}}
            </div>
            <div v-else-if="one.type=='datetime'" style="text-align:center;">
              {{scope.row[one.labelName] | dateFormate}}
            </div>
            <div v-else style="text-align:center;">
              {{scope.row[one.labelName]}}
            </div>
          </template>
        </el-table-column>
        <el-table-column class="table-header" v-for="(one,index) in headers" :key="'mulHead'+index" :render-header="one.renderHeader || renderHeader" :fixed="one.fixed" :label="one.label" :prop="one.labelName" :align='one.align' :type="one.type" :sortable="one.sortable" :width="one.width" :min-width="one.minWidth" v-if="one.mulHead">
          <div v-for="ite in one.children" :key="ite.label">
            <el-table-column :label="ite.label" :prop="ite.labelName" :width="ite.width" style="background-color:#E5E5E5;" :fixed="ite.fixed">
              <template slot-scope="scope">
                <div v-if="ite.type=='comps'">
                  <slot :row="scope.row" :tplName="ite.tplName" :index="scope.$index" :val="scope.row[ite.labelName]"></slot>
                </div>
                <div v-else-if="ite.type=='money'" style="text-align:center;">
                  {{scope.row[ite.labelName]||0 | num2money}}
                </div>
                <div v-else-if="ite.type=='date'" style="text-align:center;">
                  {{scope.row[ite.labelName] | dateFormate('yyyy-mm-dd')}}
                </div>
                <div v-else-if="ite.type=='datetime'" style="text-align:center;">
                  {{scope.row[ite.labelName] | dateFormate}}
                </div>
                <div v-else style="text-align:center;">
                  {{scope.row[ite.labelName]}}
                </div>
              </template>
            </el-table-column>
          </div>
        </el-table-column>
        <div slot="empty">
          没有数据
        </div>
      </el-table>
    </div>
    <!-- && (counts > pageInfo.pageSize) -->
    <div class="table-pagination" v-if="pagination">
      <el-pagination class="pagination" @current-change="pageChange" :current-page="pageInfo.pageNo*1" :page-size="pageInfo.pageSize" :small="simplePagination" :layout="simplePagination?'prev, pager, next':'total,  prev, pager, next, jumper'" :total="counts">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import baseTable from "./table.js";
export default {
  mixins: [baseTable],
  name: "table-e",
  props: {
    loading: {
      default: false,
      type: Boolean
    },
    headers: {
      type: Array,
      default: function() {
        return [];
      },
      required: true
    },
    params: {
      default: function() {
        return {};
      },
      type: Object
    },
    pagination: {
      default: true,
      type: Boolean
    },
    pageInfo: {
      default: function() {
        return { pageNo: 1, pageSize: 20 };
      },
      type: Object
    },
    counts: {
      default: 0,
      type: Number
    },
    simplePagination: {
      type: Boolean,
      default: false
    },
    storeName: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      searchInstance: {}
    };
  },

  components: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {
    pageChange: async function(page) {
      this.pageInfo.pageNo = page || 1;
      this.$emit("pageChange", this.pageInfo);
      if (this.searchInstance.search)
        this.searchInstance.search(this.pageInfo, true);
      else if (this.storeName != "") {
        Object.assign(this.params, { pageNo: page });
        this.$store.dispatch(`${this.storeName}/getList`, this.params);
      }
    },
    setSearch: function(search) {
      this.searchInstance = search;
    }
  }
};
</script>
<style lang="stylus">
.table-header
  background-color #f5f5f5 !important
  text-align center !important
.el-table-column--selection
  text-align left !important
</style>
<style lang="stylus" scoped>
.table-pagination
  position relative
  height 40px
  .pagination
    position absolute
    right 20px
    top 4px

</style>

