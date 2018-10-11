<!-- 会员管理 -->
<template>
  <div>
      <div class="content">
        <search-panel :searchParams.sync="searchParams" :searchOption="searchOption" @search="search">
          <el-button type="primary" size="small" slot="right" @click="addVisible = true">新建会员</el-button>
        </search-panel>
        <table-e :datas="tableData.list" :counts='tableData.count' name="providerMember" storeName="providerMember" :headers="headers">
          <template slot-scope="props">

            <div v-if="props.tplName=='info'" class="info">
              <div class="portrait">
                <img :src="props.row.logoImgUrl||tempimg | imgSize(60,60)">
              </div>
              <div class="info-details">
                <div class="company">{{props.row.cardname}}</div>
              </div>
            </div>

            <div v-if="props.tplName=='goodsNum'">
              <span class="link" @click="toHyView(props.row)">{{props.row.currProductNum1+props.row.currProductNum2}}</span>/ <span>{{props.row.maxProductNum1+props.row.maxProductNum2}}</span>
            </div>

            <div v-if="props.tplName=='dateRange'">
              <span>{{props.row.uTerm | dateFormate('yyyy-mm-dd')}}</span>
              <span v-if="props.row.uTerm||props.row.uTerm"> 至 </span>
              <span>{{props.row.uToterm | dateFormate('yyyy-mm-dd')}}</span>
            </div>

            <div v-if="props.tplName=='uIfvalid'">
              <div :class="props.row.uIfvalid=='Y'?'success':'fail'">
                <i class="iconfont icon-dian"></i>{{props.row.uIfvalid=='Y'?'启用':'未开通'}}
              </div>
            </div>

            <div v-if="props.tplName=='operation'">
              <el-button type="text" @click="checkDetails(props.row)">查看详情</el-button>
              <el-button type="text" @click="openOne(props.row)" v-if="props.row.uIfvalid=='N'">开通</el-button>
            </div>

          </template>
        </table-e>
      </div>
      <details-dialog :visible.sync="detailsVisible" :data="currentData"></details-dialog>
      <add-member-dialog :visible.sync="addVisible" v-if="addVisible" @success="search"></add-member-dialog>
      <open-member-dialog :visible.sync="oepnVisible" v-if="oepnVisible" :data="currentData" @success="search"></open-member-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import tempimg from "@/assets/images/temp.jpg";
import detailsDialog from "./_details";
import addMemberDialog from "./_addMember";
import openMemberDialog from "./_openMember";
import storejs from "storejs";
export default {
  name: "member",
  data() {
    return {
      tempimg,
      searchParams: {
        cardname: "",
        cntInfo: "",
        uIfvalid: ""
      },
      searchOption: [
        { label: "会员信息:", key: "cardname" },
        { label: "企业负责人信息:", key: "cntInfo" },
        {
          label: "状态:",
          key: "uIfvalid",
          type: "select",
          option: [
            {
              value: "Y",
              label: "启用"
            },
            {
              value: "N",
              label: "未开通"
            }
          ]
        }
      ],
      headers: [
        { label: "会员编码", labelName: "cardcode", type: "data", width: 180 },
        {
          label: "会员信息",
          labelName: "info",
          type: "comps",
          width: 260,
          tplName: "info"
        },
        {
          label: "在售商品数量",
          labelName: "goodsNum",
          type: "comps",
          tplName: "goodsNum"
        },
        { label: "企业负责人", labelName: "cntctprsn", type: "data" },
        { label: "负责人电话", labelName: "phone2", type: "data" },
        {
          label: "合同有效期",
          labelName: "dateRange",
          type: "comps",
          tplName: "dateRange"
        },
        {
          label: "状态",
          labelName: "uIfvalid",
          type: "comps",
          tplName: "uIfvalid",
          width: 80
        },
        {
          label: "操作",
          labelName: "operation",
          tplName: "operation",
          type: "comps",
          width: 150
        }
      ],
      detailsVisible: false,
      currentData: {},
      addVisible: false,
      oepnVisible: false
    };
  },

  components: { detailsDialog, addMemberDialog, openMemberDialog },

  computed: {
    ...mapGetters({
      tableData: "providerMember/data"
    })
  },

  created() {
    this.getList(this.searchParams);
  },

  mounted() {},

  methods: {
    ...mapActions({
      getList: "providerMember/getList"
    }),
    search() {
      this.getList(this.searchParams);
    },
    checkDetails(obj) {
      this.currentData = obj;
      this.detailsVisible = true;
    },
    openOne(obj) {
      this.currentData = obj;
      this.oepnVisible = true;
    },
    toHyView(obj) {
      storejs({ currentHy: obj });
      this.$router.push({ name: "hy" });
    }
  }
};
</script>
<style lang="stylus" scoped>
.info
  display flex
  align-items center
  .portrait
    width 60px
    height 60px
    text-align center
    &>img
      max-width 100%
      max-height 100%
  .info-details
    padding 10px
    color #00000072
.success
  color #52c41a
.fail
  color #f5222d
.link
  color #409EFF
  cursor pointer
</style>
