<template>
    <div class="content">
        <div class="main-title">
            <span>订单详情</span>
            <div style="float:right">
                <el-button size="small" @click="$router.go(-1)">返回</el-button>
            </div>
        </div>
        <panel icon="icon-huiyuan" title="会员信息">
            <el-row :gutter="0">
                <el-col :span="5">
                    <div class="panel-row">
                        <div class="panle-item">
                            会员编号：{{orderDetails.data.cardCode}}
                        </div>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="panel-row">
                        <div class="panle-item">
                            会员名称：{{orderDetails.data.cardName}}
                        </div>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="panel-row">
                        <div class="panle-item">
                            负责人：{{orderDetails.data.cntctPrsn}}
                        </div>
                    </div>
                </el-col>
                <el-col :span="9">
                    <div class="panel-row">
                        <div class="panle-item">
                            负责人电话：{{orderDetails.data.phone2}}
                        </div>
                    </div>
                </el-col>
            </el-row>
        </panel>
        <panel icon="icon-kehu" title="客户信息">
            <el-row :gutter="0">
                <el-col :span="5">
                    <div class="panel-row">
                        <div class="panle-item">
                            客户姓名：{{orderDetails.data.cusName }}
                        </div>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="panel-row">
                        <div class="panle-item">
                            手机号码：{{orderDetails.data.cusMobile }}
                        </div>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="panel-row">
                        <div class="panle-item">
                            有无电梯：{{orderDetails.data.hasLift==1?'有':'无'}}
                        </div>
                    </div>
                </el-col>
                <el-col :span="9">
                    <div class="panel-row">
                        <div class="panle-item">
                            房屋地址：{{orderDetails.data.consAddress }}
                        </div>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="panel-row">
                        <div class="panle-item">
                            跟单员：{{orderDetails.data.empName }}
                        </div>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="panel-row">
                        <div class="panle-item">
                            手机号码：{{orderDetails.data.empMobile }}
                        </div>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="panel-row">
                        <div class="panle-item">
                            备注：{{orderDetails.data.remark }}
                        </div>
                    </div>
                </el-col>
            </el-row>
        </panel>
        <panel icon="icon-dingdan2" title="订单信息">
            <table-ord :tableData="tableData" :heads="heads" :status="10">
                <template slot="tableHeader" slot-scope="props">
                    <div class="item">{{props.info.createAt}}</div>
                    <div class="item">订单号：{{props.info.orderNo}}</div>
                    <div class="item">{{valToText(props.info.payType,payTypeList).label}}</div>
                    <div class="item right">
                        <div>
                            <el-button v-if="props.info.status==13" type="text" icon="el-icon-search" @click="reviewComments($route.params.id)">查看评价</el-button>
                            <el-button type="text" icon="el-icon-search" @click="checkLogistics(props.info)">查看物流</el-button> |
                            <span>{{valToText(props.info.status,statusList).label}}</span>
                        </div>
                    </div>
                </template>
            </table-ord>
        </panel>
        <panel icon="icon-shouhuo" title="收货信息">
            <el-row :gutter="0">
                <el-col :span="6">
                    <div class="panel-row">
                        <div class="panle-item">
                            收货人：{{orderDetails.data.consName}}
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="panel-row">
                        <div class="panle-item">
                            收货人手机：{{orderDetails.data.consMobile}}
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="panel-row">
                        <div class="panle-item">
                            收货人地址：{{orderDetails.data.flfAddress}}
                        </div>
                    </div>
                </el-col>
            </el-row>
        </panel>
        <comment-dialog :visible.sync="cVisible" v-if="cVisible" :evaluate="evaluate"></comment-dialog>
        <logistics-dialog :visible.sync="lVisible" v-if="lVisible" :data="logistics"></logistics-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { statusList } from "@/utils/const.js";
import moduleEvent from "@/event/moduleEvent";
export default {
  data() {
    return {
      heads: [
        {
          label: "产品信息",
          type: "data",
          width: 380,
          subHeads: [
            {
              labelName: "itemname",
              width: 530,
              type: "proInfo"
            },
            {
              labelName: "quantity",
              width: 150,
              type: "quantity"
            },
            {
              labelName: "remark"
            }
          ]
        },
        {
          label: "规格参数",
          labelName: "createAt",
          type: "data",
          width: 150
        },
        {
          label: "采购数量",
          labelName: "quantity",
          type: "data",
          width: 150
        },
        {
          label: "备注",
          labelName: "remark",
          type: "data"
        }
      ],
      statusList,
      payTypeList: [
        {
          label: "余额支付",
          value: 0
        },
        {
          label: "授信支付",
          value: 1
        }
      ],
      logistics: [],
      cVisible: false,
      lVisible: false
    };
  },

  components: {},

  computed: {
    ...mapGetters({
      orderDetails: "order/data",
      evaluate: "evaluate/data"
    }),
    tableData: function() {
      return [
        { ...this.orderDetails.data, data: this.orderDetails.data.products }
      ];
    }
  },

  created() {
    this.getOrderDetails(this.$route.params.id);
  },

  mounted() {},

  methods: {
    ...mapActions({
      getOrderDetails: "order/getById",
      getEvaluate: "evaluate/getById",
      getLogistics: "logistics/getById"
    }),
    valToText(val, list) {
      let obj = {};
      if (val != undefined) {
        list.forEach(item => {
          if (item.value == val) {
            obj = item;
          }
        });
      }
      return obj;
    },
    async reviewComments(id) {
      moduleEvent.$emit("actionload", true);
      await this.getEvaluate(id);
      this.cVisible = true;
    },
    async checkLogistics(row) {
      // row.orderNo = "FZCG201710115374_103";
      moduleEvent.$emit("actionload", true);
      let res = await this.getLogistics(row.orderNo);
      this.logistics = res.data;
      moduleEvent.$emit("actionload", false);
      if (!res.data.length) {
        this.$message.warning("暂无物流信息");
        return;
      }
      this.lVisible = true;
    }
  }
};
</script>
<style lang="stylus" scoped>
.main-title
    height 50px
    border-bottom 1px solid #e5e5e5
    display flex
    align-items center
    margin-bottom 20px
    &>span
        flex 1
        padding-left 10px
        border-left 2px solid #409eff
.panel-row
    padding 15px 0
    margin-left 45px
.panle-item
    line-height 40px
    color #606266
.item
    display inline
    margin-left 20px
    &.right
        width 250px
        margin-right 20px
        float right
        text-align right
</style>
