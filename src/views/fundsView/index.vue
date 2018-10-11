<!-- 首页 -->
<template>
  <div>
    <header-menu></header-menu>
    <div class="content-head" v-if="accountInfo.data.cardCode">
      <div class="account-info">
        <div class="name">
          <i class="iconfont icon-fuwushang"></i>{{accountInfo.data.cardName}}
        </div>
        <div class="details">
          <div class="item">
            服务商编号：{{accountInfo.data.cardCode}}
          </div>
          <div class="item">
            负责人：{{accountInfo.data.cntctPrsn}}
          </div>
          <div class="item">
            联系方式：{{accountInfo.data.phone2}}
          </div>
          <div class="item">
            合同有效期：{{accountInfo.data.uTerm}}至{{accountInfo.data.uToterm}}
          </div>
          <div class="item">
            开户银行：{{accountInfo.data.uBbank}}
          </div>
          <div class="item">
            开户账户：{{accountInfo.data.uBankname}}
          </div>
          <div class="item">
            开户行地址：{{accountInfo.data.uBaddress}}
          </div>
        </div>
      </div>
      <div class="account">
        <div class="icon">
          <i class="iconfont icon-leijijine"></i>
        </div>
        <div class="main">
          <div class="label">账户余额</div>
          <div class="value">
            {{accountInfo.data.balanceInfo&&accountInfo.data.balanceInfo.balance}}元
            <el-button size="small" type="primary" style="margin-left:20px;" @click="wVisible=true">提现</el-button>
            <i style="margin-left:10px;color: #E6A23C" class="iconfont icon-tips" v-popover:popover></i>
            <el-popover ref="popover" placement="right" width="400" trigger="hover">
              <div class="pop">
                <div class="title">提现须知：</div>
                <div>
                  1、1万以下（含1万）手续费5元；<br> 2、1-10万（含10万）手续费10元；
                  <br> 3、10-50万（含50万）手续费15元；
                  <br> 4、50-100万（含100万）手续费20元；
                  <br> 5、100-1000万（含1000万）按0.00002比率计算算；
                  <br> 6、大于1000万手续费200元；
                  <br>
                </div>
                <div class="warning">例：提现10000元，扣除手续5元，实际到账银行卡金额9995元</div>
              </div>
            </el-popover>
          </div>
        </div>
        <div class="operation">
          <el-button type="text" @click="rVisible= true">查看提现记录</el-button>
        </div>
      </div>
      <div class="account" style="margin-left:20px">
        <div class="icon">
          <i class="iconfont icon-jine"></i>
        </div>
        <div class="main">
          <div class="label">冻结金额</div>
          <div class="value">
            {{accountInfo.data.balanceInfo&&accountInfo.data.balanceInfo.frozenMount}}元
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <search-panel :searchParams.sync="searchParams" :searchOption="searchOption" @search="search">
        <el-button size="small" slot="right" @click="btnExport">导出</el-button>
      </search-panel>
      <table-e :datas="tableData.list" store :counts='tableData.count' name="accountRetrieve" storeName="accountRetrieve" :headers="headers"></table-e>
    </div>
    <withdraw-dialog :visible.sync="wVisible" v-if="wVisible" :accountInfo="accountInfo.data"></withdraw-dialog>
    <record-dialog :visible.sync="rVisible" v-if="rVisible" ></record-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { exportCommon } from "@/utils";
import moduleEvent from "@/event/moduleEvent";
import WithdrawDialog from "./_withdrawDialog";
import RecordDialog from "./_recordDialog";
export default {
  name: "funds",
  data() {
    return {
      searchParams: {
        typeCode: "",
        billSDate: "",
        billEDate: ""
      },
      searchOption: [
        {
          label: "订单类型:",
          key: "typeCode",
          type: "select",
          option: [
            { label: "主材扣款", value: "ZA" },
            { label: "运费扣款", value: "AC" },
            { label: "Pos刷入", value: "AD" },
            { label: "打款", value: "AE" },
            { label: "服务费扣款", value: "FD" }
          ]
        },
        {
          label: "凭证日期:",
          keys: ["billSDate", "billEDate"],
          type: "dateRange"
        }
      ],
      headers: [
        { label: "类型", labelName: "u_Type", type: "data", width: 180 },
        { label: "凭证日期", labelName: "taxDate", type: "data", width: 180 },
        { label: "借方金额", labelName: "debit", type: "data" },
        { label: "贷方金额", labelName: "credit", type: "data" },
        { label: "订单号", labelName: "orderNumber", type: "data" },
        { label: "累计余额", labelName: "cumBalance", type: "money" },
        { label: "科目名称", labelName: "acctName", type: "data" },
        { label: "备注", labelName: "memo", type: "data" }
      ],
      wVisible: false,
      rVisible: false
    };
  },

  components: { WithdrawDialog, RecordDialog },

  computed: {
    ...mapGetters({
      tableData: "accountRetrieve/data",
      accountInfo: "accountInfo/data"
    })
  },

  created() {
    this.getList(this.searchParams);
    this.getAccountInfo();
  },

  mounted() {},

  methods: {
    ...mapActions({
      getList: "accountRetrieve/getList",
      getAccountInfo: "accountInfo/getByParams"
    }),
    search() {
      this.getList(this.searchParams);
    },
    async btnExport() {
      await exportCommon("provider/account/exportBills", this.searchParams);
    }
  }
};
</script>
<style lang="stylus" scoped>
.content-head
  background-color #fff
  padding-top 20px
  display flex
  flex-wrap wrap
  padding 0 15px
  min-width 1200px
  .account-info
    padding 20px 15px
    border 1px solid #e2e2e2
    margin 15px 0
    width 100%
    .name
      font-weight 700
      font-size 20px
      line-height 40px
      &>.iconfont
        font-size 25px
        margin-right 15px
        line-height 30px
        color #409eff
    .details
      margin 0 40px
      color #606266
      display flex
      flex-wrap wrap
      .item
        width 25%
        padding 10px 15px
        box-sizing border-box
  .account
    flex 1
    padding 20px 15px
    background-color #fafafa
    border 1px solid #e2e2e2
    box-sizing border-box
    display flex
    align-items center
    .icon
      &>.iconfont
        font-size 45px
        color #409eff
    .main
      flex 1
      box-sizing border-box
      padding 0 15px
      .label
        color gray
        line-height 30px
      .value
        font-size 23px
        color #606266
.pop
  line-height 25px
  .title
    position relative
    padding-left 15px
  .title::before
    content ''
    position absolute
    left 0
    top 5px
    width 4px
    height 16px
    background-color #409eff
  .warning
    color #E6A23C
</style>
