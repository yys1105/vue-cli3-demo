<template>
    <el-dialog title="查看评价" :visible="dialogVisible" @update:visible="updateVisible" width="800px" :lock-scroll="true">
        <div v-for="(ite,i) in data" :key="i" style="margin-bottom:20px;">
            <div>
                <div class="header">
                    <span class="left">物流单号: {{ite.docNum}}</span>

                    <span class="right" v-if="receivedBool && ite.orderStatus!=0 && ite.fzSignStatus=='N'||ite.fzSignStatus==null">
                        <slot name="sbumit">
                            <el-button type="text" @click="confirm(ite.docNum)">确认收货</el-button>
                        </slot>
                    </span>
                    <span class="right" v-if="ite.orderStatus==0">已驳回</span>
                </div>

                <div class="message">
                    <div class="message-item">
                        预计提货： {{ite.prePickpuTime}}
                    </div>
                    <div class="message-item">
                        预计送达： {{ite.preReceiveTime}}
                    </div>
                </div>

                <div class="step">
                    <div class="step-item" v-for="(item,index) in ite.records" :key="index">
                        {{item.time}} {{item.name}}
                    </div>
                </div>

                <el-table :data="ite.orderLines" style="width: 100%;">
                    <el-table-column prop="itemCode" label="商品编码" align="center">
                    </el-table-column>
                    <el-table-column prop="dscription" label="产品名称" align="center">
                    </el-table-column>
                    <el-table-column prop="u_Brand" label="品牌" align="center">
                    </el-table-column>
                    <el-table-column prop="u_Modle" label="型号" align="center">
                    </el-table-column>
                    <el-table-column prop="quantity" label="数量" align="center">
                    </el-table-column>
                    <el-table-column prop="unitMsr" label="单位" align="center">
                    </el-table-column>
                </el-table>

                <div class="message">
                    包装总数量： {{ite.u_PackingQ}}
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dialog from "@/components/dialog/dialog.js";
export default {
  mixins: [dialog],
  props: {
    receivedBool: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: function() {
        return [
          {
            orderNo: "",
            docNum: "",
            prePickpuTime: "",
            preReceiveTime: "",
            records: [],
            orderLines: [],
            u_PackingQ: "",
            fzSignStatus: "N",
            orderStatus: 0
          }
        ];
      }
    }
  },
  data() {
    return {};
  },

  components: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {
    ...mapActions({
      orderConfirm: "orderConfirm/postId"
    }),
    async confirm(docNum) {
      let res = await this.orderConfirm(docNum);
      this.$message.success(res.msg);
      this.updateVisible(false);
    }
  }
};
</script>
<style lang="stylus" scoped>
.header
    height 50px
    line-height 50px
    background-color #eaf0f6
    padding 0 20px
    .left
        float left
    .right
        float right
.message
    height 50px
    line-height 50px
    padding 0 20px
.message-item
    float left
    margin-right 20px
.step
    padding 20px
    .step-item
        position relative
        margin-left 20px
        margin-bottom 25px
        padding-top 5px
        padding-left 10px
        &:last-child
            margin-bottom 0
        &::before
            content ''
            position absolute
            top 4px
            left -17px
            width 12px
            height 12px
            border-radius 50%
            border 2px solid #4e9ee0
        &:not(:last-child)::after
            content ''
            position absolute
            left -10px
            top 20px
            width 1px
            height 30px
            border-left 2px solid #d2dbe5
</style>
